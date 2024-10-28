const express = require("express");
const router = express.Router();
router.use(express.json());
const productService = require("../Service/productService");

async function addNewProduct(req, res) {
  try {
    const data = req.body;
    const result = await productService.addProduct(
      data.name,
      data.category,
      data.price,
      data.quantity
    );
    res.status(200).send(result);
  } catch (err) {
    res.status(400).send(err.message);
  }
}

async function searchProduct(req, res) {
  try {
    const keyword = req.params.keyword;
    const result = await productService.searchProduct(keyword);
    res.status(200).send(result);
  } catch (err) {
    res.status(400).send(err.message);
  }
}

async function removeProduct(req, res) {
  try {
    const productId = req.params.id.trim();
    // console.log(productId)
    const result = await productService.removeProducts(productId);
    res.status(200).send(result);
  } catch (err) {
    res.status(400).send(err.message);
  }
}
//

async function updateProduct(req, res) {
  try {
    const productId = req.params.id;
    const data = req.body;
    const result = await productService.updateProduct(productId, data);
    res.status(200).send(result);
  } catch (err) {
    res.status(400).send(err.message);
  }
}

async function allProducts(req, res) {
  try {
    const data = req.body;
    const result = await productService.getProducts();
    res.status(200).json(result);
  } catch (err) {
    res.status(400).json(err.message);
  }
}

async function getProductFromId(req, res) {
  try {
    const productId = req.params.id;
    // const data = req.body;
    const result = await productService.getProductFromId(productId);
    console.log(result)
    res.status(200).json(result);
  } catch (err) {
    res.status(400).json({'message':"something wrong"});
  }
}

module.exports = {
  addNewProduct,
  searchProduct,
  removeProduct,
  updateProduct,
  allProducts,
  getProductFromId
};
