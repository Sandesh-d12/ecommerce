const mongodb = require("mongodb")
function cartModel(userId){
    return{
    user_id:userId,
    products: [],
    status: "active"
    }     
 }
 module.exports = {cartModel}