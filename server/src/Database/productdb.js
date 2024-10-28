// var MongoClient = require("mongodb").MongoClient;
// const url = "mongodb://localhost:27017/PHASE1";
const DB = require("./config");
const mongodb = require("mongodb");

async function getProduct() {
  let db = await DB.db_connect("products");
  let user = await db.find({}).toArray();
  if (user) return user;
}

async function getProductById(id) {
  try {
    let db = await DB.db_connect("products");
    let user = await db.findOne({ _id: new mongodb.ObjectId(id) });
    if (user) {
      // console.log(user)
      return user;
    }
    // throw new Error("no product found for this id")
  } catch (err) {
    throw err;
  }
}
// getProductById("6329bbda26f8c5c83a1a1df5")

// async function addProduct(productData) {
//   let db = await DB.db_connect("products");
//   let user = await db.insertOne(productData);
//   if (user) return true;
//   return false;
// }

async function addNewProduct(productData) {
  try {
    let db = await DB.db_connect("products");
    let user = await db.insertOne(productData);
    console.log(user);
    if (user) return true;
    return false;
  } catch (err) {
    throw err;
  }
}

async function searchProductByKeyWords(keyword) {
  try {
    let db = await DB.db_connect("products");
    let allProduct = await db.find({}).toArray();

    const result = [];
    for (let products of allProduct) {
      for (let key in products) {
        if (key === "id") {
          continue;
        } else {
          if (
            typeof products[key] === "string" &&
            typeof keyword === "string"
          ) {
            if (
              products[key].toLowerCase().indexOf(keyword.toLowerCase()) !== -1
            ) {
              result.push(products);
              break;
            }
          }
        }
      }
    }
    if (result.length > 0) {
      return result;
    }
    throw new Error("no product found");
  } catch (err) {
    throw err;
  }
}

async function removeProduct(productId) {
  try {
    // productId = JSON.stringify(productId)
    // productId = productId.trim()
    // console.log(productId.length)

    let db = await DB.db_connect("products");
    // const res = new mongodb.ObjectId(productId)
    // console.log(res)
    const product = await db.findOne({ _id: new mongodb.ObjectId(productId) });
    // console.log(new mongodb.ObjectId(productId))
    // console.log(product)
    if (product) {
      // console.log(product)
      const result = await db.deleteOne({
        _id: new mongodb.ObjectId(productId),
      });
      return result.acknowledged;
    }
    throw new Error("error while removing product");
  } catch (err) {
    throw err;
  }
}

async function updateProducts(productId, productInfo) {
  try {
    let db = await DB.db_connect("products");
    const product = await db.findOne({ _id: new mongodb.ObjectId(productId) });
    if (product) {
      const result = await db.updateOne(
        { _id: new mongodb.ObjectId(productId) },
        { $set: productInfo }
      );
      return result.acknowledged;
    }
    throw new Error("No Product Found for Id");
  } catch (err) {
    throw err;
  }
}

async function updateStore(product_id, new_product) {
  try {
    let db = await DB.db_connect("products");
    const product = await db.findOne({ _id: mongodb.ObjectId(product_id) });
    if (product) {
      const result = await db.updateOne(
        { _id: mongodb.ObjectId(new_product._id) },
        { $set: new_product }
      );
      return result.acknowledged;
    }
    // throw new Error("updating store failed")
    return false;
  } catch (err) {
    throw err;
  }
}

async function checkProductOnStore(product_id) {
  try {
    let db = await DB.db_connect("products");
    const product = await db.findOne({ _id: new mongodb.ObjectId(product_id) });
    if (product) {
      return product;
    }
    throw new Error("no product found for id:" + product_id);
  } catch (err) {
    throw err;
  }
}

async function decreaseQuantityOnStore(product_id, quantity) {
  try {
    let db = await DB.db_connect("products");
    const product = await db.findOne({ _id: new mongodb.ObjectId(product_id) });
    if (product) {
      const res = await db.updateOne(
        { _id: new mongodb.ObjectId(product_id) },
        { $set: { quantity: product.quantity - quantity } }
      );
      return res.acknowledged;
    }
    throw new Error("no product found for id:" + product_id);
  } catch (err) {
    throw err;
  }
}

async function changeQuantityOnStore(product_id, quantity) {
  try {
    let db = await DB.db_connect("products");
    const product = await db.findOne({ _id: new mongodb.ObjectId(product_id) });
    if (product) {
      const res = await db.updateOne(
        { _id: new mongodb.ObjectId(product_id) },
        { $set: { quantity: product.quantity + quantity } }
      );
      return res.acknowledged;
    }
    throw new Error("error changing quantity on store");
  } catch (err) {
    throw err;
  }
}

module.exports = {
  getProduct,
  searchProductByKeyWords,
  removeProduct,
  updateProducts,
  checkProductOnStore,
  addNewProduct,
  decreaseQuantityOnStore,
  updateStore,
  changeQuantityOnStore,
  getProductById,
};
