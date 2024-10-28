var MongoClient = require("mongodb").MongoClient;
const url = "mongodb://localhost:27017/PHASE1";
const DB = require("./config");
const bcrypt = require("bcrypt");
const mongodb = require("mongodb");

async function getUsers() {
  try {
    let db = await DB.db_connect("users");
    let user = await db.find().toArray();
    if (user) return user;
  } catch (err) {
    throw err;
  }
}

async function addUser(userData) {
  try {
    let db = await DB.db_connect("users");
    let user = await db.insertOne(userData);
  
    // if (user) return true;
    // return false;
    return user.acknowledged;
  } catch (err) {
    throw err;
  }
}

async function findUserFromEmail(email) {
  try {
    let db = await DB.db_connect("users");
    let user = await db.findOne({ email: email });
    if (user) {
      return user;
    }
    return false;
  } catch (err) {
    throw err;
  }
}

async function getUserById(user_id) {
  try {
    let db = await DB.db_connect("users");
    let user = await db.findOne({ _id: mongodb.ObjectId(user_id) });
    if (user) {
      return user;
    }
    return false;
  } catch (err) {
    throw err;
  }
}

async function findUserFromUserData(email, password) {
  try {
    let db = await DB.db_connect("users");
    let user = await db.findOne({ email: email });
    if (user) {
      if (email === user.email && bcrypt.compareSync(password, user.password))
        return user;
    }
    throw new Error("invalid login details");
  } catch (err) {
    throw err;
  }
}

async function removeUser(user_id) {
  try {
    // productId = JSON.stringify(productId)
    // productId = productId.trim()
    // console.log(productId.length)

    let db = await DB.db_connect("users");
    // const res = new mongodb.ObjectId(productId)
    // console.log(res)
    const user = await db.findOne({ _id: new mongodb.ObjectId(user_id) });
    // console.log(new mongodb.ObjectId(productId))
    // console.log(product)
    if (user) {
      // console.log(product)
      const result = await db.deleteOne({ _id: new mongodb.ObjectId(user_id) });
      return result.acknowledged;
    }
    throw new Error("error while removing product");
  } catch (err) {
    throw err;
  }
}

module.exports = {
  addUser,
  getUsers,
  findUserFromEmail,
  getUserById,
  findUserFromUserData,
  removeUser,
};
