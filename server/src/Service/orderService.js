const user = require("../Database/orderdb");
const productData = require("../Database/productdb");
const cartData = require("../Database/cartdb");
const Schema = require("../models/orderModels");

// PLACE ORDER
async function placeOrder(user_id, payment, shipment) {
  try {
    total_cost = 0;
    const paymentType = ["esewa", "khalti", "cash on delivery", "paypal"];
    if (!paymentType.includes(payment.type)) {
      throw new Error("invalid payment type");
    }
    const cartResult = await cartData.findCart(user_id);
    if (cartResult.status !== "active") {
      throw new Error("no active cart found");
    }
    for (p of cartResult.products) {
      const product_result = await productData.checkProductOnStore(p.id);
      if (product_result.quantity < p.quantity) {
        throw new Error("not sufficient quantity on store");
      }
      total_cost += product_result.price * p.quantity;
      productData.decreaseQuantityOnStore(p.id, p.quantity);
    }
    const orderData = await Schema.orderModel(
      cartResult,
      total_cost,
      payment,
      shipment
    );
    const result = await user.addOrder(orderData);
    if (result.acknowledged) {
      if (cartData.changeStatusOfCart(user_id)) {
        return { message: "order placed", orderId: result.insertedId };
      }
      throw new Error("error while deactivating cart");
    }
    throw new Error("order failed");
  } catch (err) {
    throw err;
  }
}
const payment = { type: "esewa", status: "paid" };
const shipment = {
  status: "awaiting",
  location_type: "national",
  address: {
    country: "Nepal",
    district: "Lalitpur",
    town: "Patan",
    house_number: 22446,
  },
};

// placeOrder("632444faeac7706c4242a1c6", payment,shipment);

// UPDATE PRODUCTS

async function updateProductOnOrder(id, product_id, quantity) {
  try {
    let product_res = await productData.checkProductOnStore(product_id);
    if (product_res.quantity < quantity) {
      throw new Error("not sufficient quantity on store");
    }
    const order = await user.findOrder(id);
    if (order) {
      for (product of order.products) {
        if (product.id === product_id) {
          product_res.quantity += product.quantity;
          order.total_cost -= product.quantity * product_res.price;

          product.quantity = quantity;
          order.total_cost += quantity * product_res.price;
          product_res.quantity -= quantity;

          if (await productData.updateStore(product_id, product_res)) {
            if (await user.updateOrder(id, order)) {
              return { message: "order updated successfully" };
            }
            throw new Error("error while updating order");
          }
          throw new Error("error while decreasing quantity on store");
        }
      }
    }
    throw new Error(`no order found for id: ${id}`);
  } catch (err) {
    throw err;
  }
}
// updateProductOnOrder(
//   "632878d560e2f9b5f2a48467",
//   "6324459dc0d23df40472bb56",
//   3
// );

// TRACK ORDER
async function trackOrder(order_id) {
  try {
    const order = await user.findOrder(order_id);
    if (order) {
      return order.status;
    }
    throw new Error("no order found");
  } catch (err) {
    throw err;
  }
}
// trackOrder("8a52c23e-e582-4866-929f-c700c29686c7");

// RETURN ORDER
async function returnOrder(order_id) {
  try {
    const order = await user.findOrder(order_id);
    if (order) {
      if (order.status === "delivered") {
        order.status = "returned";
        order.shipment.status = "returned";
        order.payment.status = "refunded";
        for (let product of order.products) {
          const product_res = await productData.checkProductOnStore(product.id);
          order.total_cost -= product_res.price * product.quantity;
          await productData.changeQuantityOnStore(product.id, product.quantity);
        }
        if (await user.updateOrder(order_id, order)) {
          return "order returned";
        }
        throw new Error("no order found");
      }
      throw new Error("order can not be returned");
    }
  } catch (err) {
    throw err;
  }
}

// returnOrder("8a52c23e-e582-4866-929f-c700c29686c7");

async function trackRefundUpdates(order_id) {
  try {
    const order = await user.findOrder(order_id);
    if (order) {
      if (order.status === "returned") {
        return order.payment.status;
      }
      throw new Error("can not refund");
    }
    throw new Error("no order found");
  } catch (err) {
    throw err;
  }
}

// trackRefundUpdates("630f572c8c219d8673084a43")

// UPDATE ADDRESS
async function updateAddress(order_id, new_address) {
  try {
    const order = await user.findOrder(order_id);
    if (order) {
      if (order.status === "placed") {
        order.shipment.address = new_address;
        if (user.updateOrder(order_id, order)) {
          return "address updated";
        }
      }
      throw new Error("can not update address");
    }
    throw new Error("error updating address");
  } catch (err) {
    throw err;
  }
}
const new_address = {
  Country: "Nepal",
  District: "Kaski",
  Town: "Pokhara",
  house_number: 2222,
};

// updateAddress("630f572c8c219d8673084a43", new_address);

// UPDATE PAYMENT METHOD
async function updatePaymentMethod(id, new_payment) {
  try {
    const paymentType = ["esewa", "khalti", "cash on delivery", "paypal"];
    if (!paymentType.includes(new_payment.type)) {
      throw new Error("invalid payment type");
    }
    const order = await user.findOrder(id);
    if (order) {
      if (order.status === "placed") {
        order.payment = new_payment;

        if (user.updateOrder(id, order)) {
          return "payment method updated";
        }
      }
      throw new Error("can not update payment method");
    }
    throw new Error("error updating payment method");
  } catch (err) {
    throw err.message;
  }
}

const new_payment = { type: "esewa", status: "paid" };

// updatePaymentMethod("630f572c8c219d8673084a43", new_payment);

//SHIPMENT UPDATES
async function updateShipment(order_id, Status) {
  try {
    const order = await user.findOrder(order_id);
    if (order) {
      order.shipment.status = Status;
      switch (order.status) {
        case "awaiting":
          order.status = "placed";
          break;
        case "vendor_sourcing":
          order.status = "approved";
          break;
        case "on_route":
          order.status = "in progress";
          break;
        case "delivered":
          order.status = "delivered";
          break;
        case "cancelled":
          if (order.status === "placed") {
            order.status = "cancelled";
            order.total_cost = 0;
            order.payment.status = "cancelled";
            if (order.status === "cancelled") {
              for (let p of order.products) {
                let product_res = await productData.checkProductOnStore(p.id);
                order.total_cost += product_res.price * p.quantity;
              }
              break;
            }
          }
          throw new Error("order can not cancelled");
      }
      if (user.updateOrder(order_id, order)) {
        return "shipment status updated";
      }
    }
    throw new Error("order can not found");
  } catch (err) {
    throw err.message;
  }
}

// updateShipment("6329a6b1d90158a888242f37", "on_route");

async function getOrder(userId) {
  try {
    const res_user = await user.findOrder(userId);
    if (res_user) {
      console.log("order::", res_user);
      return res_user;
    }
    throw new Error("error getting order");
  } catch (err) {
    console.log(err.message);
    throw err;
  }
}

async function getAll() {
  try {
    const res_user = await user.getOrder();
    if (res_user) {
      console.log("order::", res_user);
      return res_user;
    }
    throw new Error("error getting order");
  } catch (err) {
    console.log(err.message);
    throw err;
  }
}

module.exports = {
  placeOrder,
  updateProductOnOrder,
  trackOrder,
  returnOrder,
  trackRefundUpdates,
  updateAddress,
  updatePaymentMethod,
  updateShipment,
  getOrder,
  getAll,
};
