const productUser = require("../Database/productdb");
const cart = require("../Database/cartdb");
const users = require("../Database/userdb");
// const { v4: uuidv4 } = require("uuid");
const Schema = require("../models/cartModels");

//ADDD CART

async function addCart(user_id, new_products) {
  try {
    const user_res = await users.getUserById(user_id);
    if (!user_res) {
      throw new Error("no user found for id");
    }
    const product_res = await productUser.checkProductOnStore(new_products.id);
    if (product_res.quantity < new_products.quantity) {
      throw new Error("not sufficient quantity on store");
    }

    //when product to be added is already in our cart
    const cart_res = await cart.getActiveCart(user_id);
    if (cart_res) {
      for (product of cart_res.products) {
        if (product.id === new_products.id) {
          product.quantity += new_products.quantity;
          if (cart.updateCarts(cart_res)) {
            return "cart added successfully";
          }
          throw new Error("error while adding cart");
        }
      }

      // Assuming product to be added is not present on cart initially
      cart_res.products.push({
        id: new_products.id,
        quantity: new_products.quantity,
      });
      if (cart.updateCarts(cart_res)) {
        return "cart updated successfully";
      }
      throw new Error("error while adding cart");
    }

    // Assuming cart to be created is not present initially. So creating new cart
    const new_cart = Schema.cartModel(user_id);
    new_cart.products.push({
      id: new_products.id,
      quantity: new_products.quantity,
    });
    // console.log(new_cart)
    if (cart.addCart(new_cart)) {
      return "cart added successfully";
    } else {
      throw new Error("error occured");
    }
  } catch (err) {
    throw err;
  }
}

// addCart("632444faeac7706c4242a1c6", {
//   id: "6324459dc0d23df40472bb56",
//   quantity: 5,
// });

//UPDATE CART
async function updateCart(user_id, product_id, quantity) {
  try {
    const cart_res = await cart.getCartFromId(user_id);
    if (!cart_res) {
      throw new Error("no cart found");
    }
    let product_res = await productUser.checkProductOnStore(product_id);
    if (product_res.quantity < quantity) {
      throw new Error("not sufficient quantity on store");
    }
    for (let new_product of cart_res.products) {
      if (new_product.id === product_id) {
        new_product.quantity = quantity;
        if (await cart.updateCarts(cart_res)) {
          return "cart updated";
        }
      }
    }
    throw new Error("error while updating cart");
  } catch (err) {
    throw err;
  }
}

// updateCart(
//   "632444faeac7706c4242a1c6",
//   "6324459dc0d23df40472bb56",
//   3
// );

// REMOVE CART
async function removeCart(user_id) {
  try {
    const res = await cart.removeCart(user_id);
    return "cart removed successfully";
  } catch (err) {
    throw err;
  }
}

// removeCart("630f1a3afe1965933023048b")

//remove product one by one
async function removeProductFromCart(user_Id, product_Id) {
  try {
    if (await cart.removeProductFromCart(user_Id, product_Id)) {
      return "product removed successfully";
    }
    throw new Error("error removing product");
  } catch (err) {
    throw err;
  }
}
// removeProductFromCart(
//   "632444faeac7706c4242a1c6",
//   "6324459dc0d23df40472bb56"
// );

async function getUsersCart(userId) {
  try {
    const res_user = await cart.getCartFromId(userId);
    console.log(res_user)
    if (res_user) {
      return res_user;
    }
    throw new Error("error getting cart");
  } catch (err) {
    console.log(err.message);
    throw err;
  }
}
// getUsersCart("634fda71c8e8c5fbe9d36c54")

module.exports = {
  addCart,
  updateCart,
  removeCart,
  removeProductFromCart,
  getUsersCart,
};
