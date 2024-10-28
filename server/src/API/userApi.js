const express = require("express");
const router = express.Router();
router.use(express.json());
const userService = require("../Service/userService");

async function addUser(req, res) {
  try {
    const data = req.body;
    console.log(data);
    const result = await userService.signUp(
      data.firstName,
      data.lastName,
      data.email,
      data.password,
      data.Address,
      data.role
    );
    res.status(200).send({ data: result });
  } catch (err) {
    res.status(400).send({ data: err.message });
  }
}

async function logIn(req, res) {
  try {
    const data = req.body;
    const result = await userService.signIn(data.email, data.password);
    // res.status(200).send(result);
    if (result) {
      res.status(200).json({
        data: result,
      });
    }
  } catch (err) {
    res.status(401).send(err.message);
  }
}

async function getAll(req, res) {
  try {
    const result = await userService.getAll();
    res.status(200).json(result);
  } catch (err) {
    res.status(400).json(err.message);
  }
}

async function removeUser(req, res) {
  try {
    const userId = req.params.id.trim();
    // console.log(productId)
    const result = await userService.remove(userId);
    res.status(200).send(result);
  } catch (err) {
    res.status(400).send(err.message);
  }
}

module.exports = { addUser, logIn, getAll, removeUser };
