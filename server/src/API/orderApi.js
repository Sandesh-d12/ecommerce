const express = require("express");
const router = express.Router();
router.use(express.json());
const orderService = require("../Service/orderService");

async function placeOrder(req, res) {
  try {
    const userId = req.params.id;
    const data = req.body;
    const result = await orderService.placeOrder(
      userId,
      data.payment,
      data.shipment
    );
    res.status(200).send(result);
  } catch (err) {
    res.status(400).send(err.message);
  }
}

async function updateProductOnOrder(req, res) {
  try {
    const orderId = req.params.id;
    const data = req.body;
    const result = await orderService.updateProductOnOrder(
      orderId,
      data.id,
      data.quantity
    );
    res.status(200).send(result);
  } catch (err) {
    res.status(400).send(err.message);
  }
}

async function updateAddress(req, res) {
  try {
    const orderId = req.params.id;
    const data = req.body;
    const result = await orderService.updateAddress(orderId, data);
    res.status(200).send(result);
  } catch (err) {
    res.send(400).send(err.message);
  }
}

async function trackOrder(req, res) {
  try {
    const orderId = req.params.id;
    const result = await orderService.trackOrder(orderId);
    res.status(200).send(result);
  } catch (err) {
    res.status(400).send(err.message);
  }
}

async function returnOrder(req, res) {
  try {
    const orderId = req.params.id;
    const result = await orderService.returnOrder(orderId);
    res.status(200).send(result);
  } catch (err) {
    res.status(400).send(err.message);
  }
}

async function trackRefundUpdates(req, res) {
  try {
    const orderId = req.params.id;
    const result = await orderService.trackRefundUpdates(orderId);
    res.status(200).send(result);
  } catch (err) {
    res.status(400).send(err.message);
  }
}

async function updatePaymentMethod(req, res) {
  try {
    const orderId = req.params.id;
    const data = req.body;
    const result = await orderService.updatePaymentMethod(orderId, data);
    res.status(200).send(result);
  } catch (err) {
    res.send(400).send(err.message);
  }
}

async function updateShipment(req, res) {
  try {
    const orderId = req.params.id;
    const data = req.body;
    const result = await orderService.updateShipment(orderId, data);
    res.status(200).send(result);
  } catch (err) {
    res.send(400).send(err.message);
  }
}

async function getOrder(req, res) {
  try {
    const orderId = req.params.id;
    console.log(orderId);
    const result = await orderService.getOrder(orderId);
    console.log("order::", result);
    res.status(200).send(result);
  } catch (err) {
    res.status(401).send(err.message);
  }
}

async function allOrder(req, res) {
  try {
    const data = req.body;
    const result = await orderService.getAll();
    res.status(200).json(result);
  } catch (err) {
    res.status(400).json(err.message);
  }
}

module.exports = {
  placeOrder,
  updateProductOnOrder,
  trackOrder,
  returnOrder,
  trackRefundUpdates,
  updateAddress,
  updatePaymentMethod,
  updateShipment,
  getOrder,
  allOrder,
};
