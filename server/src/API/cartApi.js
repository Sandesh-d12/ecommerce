const express = require("express");
const router = express.Router();
router.use(express.json());
const cartService = require("../Service/cartService");

async function addToCart(req, res) {
  try {
    const userId = req.params.id;
    const product = req.body;
    const result = await cartService.addCart(userId, product);
    res.status(200).send(result);
  } catch (err) {
    res.status(400).send(err.message);
  }
}

async function updateProductOnCart(req, res) {
  try {
    const userId = req.params.id;
    const data = req.body;
    const result = await cartService.updateCart(
      userId,
      data.productId,
      data.quantity
    );
    res.status(200).send(result);
  } catch (err) {
    res.status(400).send(err.message);
  }
}

async function removeCart(req, res) {
  try {
    const userId = req.params.id;
    const result = await cartService.removeCart(userId);
    res.status(200).send(result);
  } catch (err) {
    res.status(400).send(err.message);
  }
}

async function removeProductFromCart(req, res) {
  try {
    const userId = req.params.id;
    const data = req.body;
    const result = await cartService.removeProductFromCart(
      userId,
      data.productId
    );
    res.status(200).send(result);
  } catch (err) {
    res.status(400).send(err.message);
  }
}
//

async function getUsersCart(req, res) {
  try {
    const userId = req.params.id;
    console.log(userId)
    const result = await cartService.getUsersCart(userId);
    console.log("cart::", result);
    res.status(200).send(result);
  } catch (err) {
    res.status(401).send(err.message);
  }
}



module.exports = {
  addToCart,
  updateProductOnCart,
  removeCart,
  removeProductFromCart,
  getUsersCart
};
