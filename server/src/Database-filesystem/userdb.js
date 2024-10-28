const bcrypt = require("bcrypt");
const fs = require("fs/promises");
require("dotenv").config({ path: "../../.env" });
const filePath = process.env.USER_URL;

async function getUsers() {
  try {
    const data = await fs.readFile(filePath, { encoding: "utf8" });
    return JSON.parse(data);
  } catch (err) {
    console.log(err.message);
  }
}

async function createUser(data1) {
  try {
    fs.writeFile(filePath, JSON.stringify(data1, null, 2), function (error) {
      if (error) {
        throw error;
      }
    });
    return true;
  } catch (err) {
    console.log(err.message);
    return false;
  }
}


async function addUser(userData) {
  const allUser = await getUsers();
  if (allUser.push(userData)) {
    //
    createUser(allUser);
  }
  return false;
}

async function findUserFromUserData(email, password) {
  const allUser = await getUsers();
  for (user of allUser) {
    if (user.email === email) {
      if (bcrypt.compareSync(password, user.password)) {
        return user;
      }
    }
  }
  return false;
}

async function getUserById(user_id){
  const allUser = await getUsers();
  for (user of allUser) {
    if (user.id === user_id) {
     return user;
    }
  }
  return false;
}

async function findUserFromEmail(email) {
  const allUser = await getUsers();
  for (user of allUser) {
    if (user.email === email) {
      return user;
    }
  }
  return false;
}



module.exports = {
  getUsers,
  createUser,
  addUser,
  findUserFromUserData,
  getUserById,
  findUserFromEmail
};
