var MongoClient = require("mongodb").MongoClient;
const url = "mongodb://localhost:27017/PHASE1";
const DB = require("./config");
const mongodb = require("mongodb")


async function getOrder() {
    try {
      let db = await DB.db_connect("order");
      let orders = await db.find().toArray();
      return orders;
    } catch (err) {
      throw err;
    }
  }
 
async function addOrder(order) {
    try {
      let db = await DB.db_connect("order");
      let result = await db.insertOne(order);
      return result;
    } catch (err) {
      throw err;
    }
  }

  // async function placeOrder(order) {
  //   try {
  //     let db = await DB.db_connect("order");
  //     let result = await db.insertOne(order);
  //     return result.acknowledged;
  //   } catch (err) {
  //     throw err;
  //   }
  // }

  async function findOrder(order_id) {
    try {
      console.log(order_id)
      let db = await DB.db_connect("order");

      const order = await db.findOne({ _id:new mongodb.ObjectId(order_id)});
      console.log(order)
      if (order) return order;
      throw new Error(`No Order Found For Id :${order_id}`);
    } catch (err) {
      throw err;
    }
  }


  async function updateOrder(order_id, new_order) {
    try {
      let db = await DB.db_connect("order");
      const order = await db.findOne({_id: new mongodb.ObjectId(order_id)})
      if (order) {
        const result = await db.updateOne(
          { _id: new mongodb.ObjectId(order_id) },
          { $set: new_order }
        );
        return result.acknowledged;
      }
      // throw new Error("Error  Updating Order");
      return false;
    } catch (err) {
      throw err;
    }
  }
  
module.exports = {getOrder, addOrder, findOrder, updateOrder}