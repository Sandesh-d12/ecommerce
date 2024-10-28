// const {v4:uuidv4} = require('uuid')
const mongodb = require("mongodb")

function productModel(name, category, price, quantity) {
  return {
    name: name,
    category: category,
    price: price,
    quantity: quantity,
  };
}

module.exports = { productModel };
