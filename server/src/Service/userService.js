const user = require("../Database/userdb");
const { User } = require("../models/userModels");
// import {User} from '../models/userModels'

async function signIn(email, password) {
  try {
    const data = await user.findUserFromUserData(email, password);
    console.log(data);
    return data;
  } catch (err) {
    console.log(err.message);
    throw err;
  }
}
// signIn("sandes@gmail.com", "0123");

// Sign Up
async function signUp(fname, lname, email, password, address, role) {
  try {
    const customer = User(fname, lname, email, password, address, role);
    if (await user.findUserFromEmail(customer.email)) {
      throw new Error("email already exists");
    }
    if (await user.addUser(customer)) {
      console.log("user added");
      return "account added";
    } else {
      throw new Error("error while adding account");
    }
  } catch (err) {
    console.log(err.message);
    throw err;
  }
}

async function getAll() {
  try {
    const data = await user.getUsers();
    console.log(data);
    return data;
  } catch (err) {
    console.log(err.message);
    throw err;
  }
}

async function remove(id) {
  try {
    // console.log(id)
    if (await user.removeUser(id)) {
      return "user removed successfully";
    }
  } catch (err) {
    throw err;
  }
}

// signUp({fname:"Sandesh", lname:"Dhakal", password:"0123", email:"sandes@gmail.com", address:"nawalpur"});

module.exports = { signUp, signIn, getAll, remove };
