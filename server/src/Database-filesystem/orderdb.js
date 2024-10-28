const fs = require("fs/promises");
require("dotenv").config({ path: "../../.env" });
const filePath = process.env.ORDER_URL;

async function getOrder() {
  try {
    const data = await fs.readFile(filePath, { encoding: "utf8" });
    return JSON.parse(data);
  } catch (err) {
    console.log(err.message);
  }
}

async function addOrder(order) {
  try {
    const allOrder = await getOrder();
    allOrder.push(order);
    fs.writeFile(filePath, JSON.stringify(allOrder, null, 2), (error) => {
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

async function placeOrder(order) {
  try {
    const allOrder = await getOrder();
    allOrder.push(order);
    return addOrder(allOrder);
  } catch (err) {
    throw err;
  }
}

async function findOrder(order_id) {
  const allOrder = await getOrder();
  for (order of allOrder) {
    if (order.id === order_id) {
      return order;
    } else {
      throw new Error("can not find order");
    }
  }
  return false;
}

async function updateOrder(order_id, newOrder) {
  const allOrder = await getOrder();
  for (order of allOrder) {
    if (order.id === order_id) {
      allOrder[allOrder.indexOf(order)] = newOrder;
      fs.writeFile(filePath, JSON.stringify(allOrder, null, 2), (error) => {
        if (error) {
          throw error;
        }
      });
      return true;
    }
  }
  return false;
}

module.exports = { getOrder, addOrder, findOrder, updateOrder, placeOrder };
