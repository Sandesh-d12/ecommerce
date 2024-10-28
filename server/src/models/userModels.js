const Bcrypt = require('bcrypt')
const Validate = require('../utils/validation.js')
  function User (firstName, lastName, email, password,address, role){
    const { error, value } = Validate.usersValidation(
        firstName,
        lastName,
        email,
        password,
        address,
        role
    );
console.log(value)
console.log(error)
    if(error) {
    throw error
    }
    return {
        firstName: value.firstName,
        lastName: value.lastName,
        email: value.email,
        password: Bcrypt.hashSync(value.password , Bcrypt.genSaltSync(10)),
        address: value.address,
        role: value.role
    };
   }
      module.exports = {User}