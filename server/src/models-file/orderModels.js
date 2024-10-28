// const paymentType  = ["esewa", "khalti", "cash on delivery", "paypal" ];
const { v4: uuidv4 } = require("uuid");

async function orderModel(cart, total_cost, payment, shipment) {
  const shipmentCharge = {
    international: 1000,
    national: 800,
    inside_ringroad: 200,
  };

  // if(!paymentType.includes(payment.type)){
  // throw new Error("invalid payment type")
  // }
  return {
    id:uuidv4(),
    user_id: cart.user_id,
    products: cart.products,
    total_cost: total_cost + shipmentCharge[shipment["location_type"]],
    payment,
    shipment,
    status: "placed",
  };
}
module.exports =  orderModel ;
