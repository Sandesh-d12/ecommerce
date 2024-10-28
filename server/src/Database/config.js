const url = "mongodb://localhost:27017/PHASE1";

const { MongoClient } = require("mongodb");
// require('dotenv').config();
const client = new MongoClient(url);
const database = "PHASE1";
const db_connect = async function (collection) {
  let result = await client.connect();
  let db = result.db(database);
  return db.collection(collection);
};
module.exports = { db_connect };
