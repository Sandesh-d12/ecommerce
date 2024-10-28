var MongoClient = require("mongodb").MongoClient;
const url = "mongodb://localhost:27017/PHASE1";
const DB = require("./config");
const mongodb = require("mongodb");

async function getCart() {
  try {
    let db = await DB.db_connect("cart");
    let carts = await db.find().toArray();
    return carts;
  } catch (err) {
    throw err;
  }
}

async function addCart(cart) {
  try {
    let db = await DB.db_connect("cart");
    let result = await db.insertOne(cart);
    return result.acknowledged;
  } catch (err) {
  console.log(`${e.name} => ${e.message}`);
   return false;
  }
}

async function getCartFromId(user_id) {
  try {
    let db = await DB.db_connect("cart");
    let cart = await db.findOne({
      user_id: user_id,
      status: "active",
    });
    console.log(cart)
    if (cart) {
      return cart;
    }
    // return false;
  } catch (err) {
    throw err;
  }
}

async function findCart(user_id) {
  try {
    let db = await DB.db_connect("cart");
    const cart = await db.findOne({
      user_id: user_id,
      status: "active",
    });
    if (cart) return cart;
    return false;
  } catch (err) {
    throw err;
  }
}

async function updateCarts(new_cart) {
  try {
    let db = await DB.db_connect("cart");
    const cart = await db.findOne({
      _id:new mongodb.ObjectId(new_cart._id),
      status: "active",
    });
    // console.log(new_cart)
    if (cart) {
      const result = await db.updateOne(
        {_id:new mongodb.ObjectId(new_cart._id)},
        {$set:new_cart }
      );
      return result.acknowledged;
    }
    throw new Error("Error  Updating Cart");
  } catch (err) {
    throw err;
  }
}
// products:new_cart.products}


// updateCarts("630c85c3f05fdaa33683700f",{})
async function removeCart(user_id) {
  try {
    let db = await DB.db_connect("cart");
    const cart = await db.findOne({
      user_id: user_id,
      status: "active",
    });
    // console.log(cart)
    if (cart) {
      const result = await db.deleteOne({
        user_id: user_id,
      });
      return result.acknowledged;
    }
    throw new Error(`No cart found for ID: ${user_id}`);
  } catch (err) {
    throw err;
  }
}

async function removeProductFromCart(user_id, product_id) {
  try {
    let db = await DB.db_connect("cart");
    const cart = await db.findOne({
      user_id: user_id,
      status: "active",
    });
    if (cart) {
      var i = 0;
      for (product of cart.products) {
        if (product.id === product_id) {
          cart.products.splice(i, 1);
          break;
        }
        i += 1;
      }
      const result = await db.updateOne(
        { user_id:user_id },
        { $set: cart }
      );
      return result.acknowledged;
    }
    throw new Error(`No product found for ID: ${product_id}`);
  } catch (err) {
    throw err;
  }
}

async function changeStatusOfCart(user_id) {
  try {
    let db = await DB.db_connect("cart");
    const cart = await db.findOne({
      user_id:user_id,
      status: "active",
    });
    if (cart) {
      const result = await db.updateOne(
        { _id: new mongodb.ObjectId(cart._id) },
        { $set: { status: "deactive" } }
      );
      return result.acknowledged;
    }
    throw new Error("cart status can not change")
  } catch (err) {
    throw err;
  }
}

async function getActiveCart(user_id) {
  try {
    let db = await DB.db_connect("cart");
    const cart = await db.findOne({
      user_id: user_id,
      status: "active",
    });
    if (cart) return cart;
    return false;
  } catch (err) {
    throw err;
  }
}

module.exports = {
  getCart,
  addCart,
  getCartFromId,
  updateCarts,
  removeCart,
  removeProductFromCart,
  findCart,
  changeStatusOfCart,
  getActiveCart,
};
