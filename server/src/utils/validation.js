const Joi = require("joi");
 function usersValidation(firstName, lastName, email, password, address, role) {
    try{
      // console.log(email)
  const schema = Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().max(30).required(),
    email: Joi.string().email().min(4).max(28).required(),
    password: Joi.string().alphanum().min(3).max(100).required(),
    address: Joi.string().alphanum().min(3).max(30).required(),
    role: Joi.string().required(),

  });
  return schema.validate({firstName, lastName, email, password, address, role});
}catch(err){
    throw err;
}
}

module.exports = { usersValidation };
