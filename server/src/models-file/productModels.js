const {v4:uuidv4} = require('uuid')

function productModel(name,category, price , quantity){
    return  {
          id: uuidv4(),
          name:name,
          category: category,
          price: price,
          quantity: quantity
        }
  }
  module.exports = productModel