const Bcrypt = require('bcrypt')
const Validate = require('../utils/validation.js')
const {v4:uuidv4} = require('uuid')
   function User ({fname, lname, email, password, address}){
    const { error, value } = Validate.usersValidation(
        fname,
        lname,
        email,
        password,
        address
    );

    if(error) {
    throw error
    }
    return {
        id: uuidv4(),
        fname: value.fname,
        lname: value.lname,
        email: value.email,
        password: Bcrypt.hashSync(value.password , Bcrypt.genSaltSync(10)),
        address: value.address
      };
   }
      module.exports = User