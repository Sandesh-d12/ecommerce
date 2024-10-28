var fs = require("fs/promises");
require("dotenv").config({ path: "../../.env" });
const filePath = process.env.PRODUCT_URL;

async function getProduct() {
  try {
    const data = await fs.readFile(filePath, { encoding: "utf8" });
    return JSON.parse(data);
  } catch (err) {
    console.log(err.message);
  }
}

async function addProduct(Product) {
  try {
    await fs.writeFile(filePath, JSON.stringify(Product, null, 2));
    return true;
  } catch (err) {
    console.log(err.message);
    return false;
  }
}

async function addNewProduct(product) {
  try {
    const allProduct = await getProduct();
    allProduct.push(product);
    return await addProduct(allProduct);
  } catch (err) {
    throw err;
  }
}

async function searchProductByKeyWords(keyword) {
  try {
    const allProduct = await getProduct();
    const result = [];
    for (let products of allProduct) {
      for (let key in products) {
        if (key === "id") {
          continue;
        } else {
          if (
            typeof products[key] === "string" &&
            typeof keyword === "string"
          ) {
            if (
              products[key].toLowerCase().indexOf(keyword.toLowerCase()) !== -1
            ) {
              result.push(products);
              break;
            }
          }
        }
      }
    }
    if (result.length > 0) {
      return result;
    }
    throw new Error("no product found");
  } catch (err) {
    throw err;
  }
}

async function removeProduct(id) {
  try {
    const allProduct = await getProduct();
    for (let i = 0; i < allProduct.length; i++) {
      if (allProduct[i].id === id) {
        allProduct.splice(i, 1);

        fs.writeFile(
          filePath,
          JSON.stringify(allProduct, null, 2),
          function (error) {
            if (error) {
              throw error;
            }
          }
        );
        return true;
      }
    }
    throw new Error("no product found");
  } catch (err) {
    throw err;
  }
}

async function updateProducts(id,productInfo) {
  try {
    const allProduct = await getProduct();
    for (let i = 0; i < allProduct.length; i++) {
      if (allProduct[i].id === id) {
        allProduct[i].quantity = productInfo.quantity;
        allProduct[i].price = productInfo.price;
        fs.writeFile(
          filePath,
          JSON.stringify(allProduct, null, 2),
          function (error) {
            if (error) {
              throw error;
            }
          }
        );
        return true;
      }
    }
    throw new Error(`no product found for id: ${id}`);
  } catch (err) {
    throw err;
  }
}

async function checkProductOnStore(product_id) {
  const all_products = await getProduct();

  for (product of all_products) {
    if (product.id === product_id) {
      return product;
    }
  }
  throw new Error("no product found for id:" + String(product_id));
}

async function updateStore(product_id, newProduct) {
  const all_products = await getProduct();
  for (product of all_products) {
    if (product.id === product_id) {
      all_products[all_products.indexOf(product)] = newProduct;
      return await addProduct(all_products);
    }
  }
  throw new Error("no product found for id:" + String(product_id));
}

async function decreaseQuantityOnStore(product_id, quantity) {
  const all_products = await getProduct();
  for (product of all_products) {
    if (product.id === product_id) {
      product.quantity -= quantity;
      addProduct(all_products);
      return;
    }
  }
  throw new Error("no product found for id:" + String(product_id));
}

async function changeQuantityOnStore(product_id, quantity) {
  const all_products = await getProduct();
  for (product of all_products) {
    if (product.id === product_id) {
      product.quantity += quantity;
      await addProduct(all_products);
      return;
    }
  }
  throw new Error("no product found");
}

module.exports = {
  getProduct,
  addProduct,
  searchProductByKeyWords,
  removeProduct,
  updateProducts,
  checkProductOnStore,
  updateStore,
  addNewProduct,
  changeQuantityOnStore,
  decreaseQuantityOnStore,
};
