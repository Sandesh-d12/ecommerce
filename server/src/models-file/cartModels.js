const{v4: uuidv4} = require('uuid')

function cartModel(user_id){
    return{
    id: uuidv4(),
    user_id: user_id,
    products: [],
    status: "active"
    }     
 }
 module.exports = cartModel