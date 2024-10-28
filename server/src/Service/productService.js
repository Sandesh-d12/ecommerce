const user = require("../Database/productdb");
const Schema = require("../models/productModels");

async function getProducts() {
  try {
    const products = await user.getProduct();
    if (products.length > 0) {
      return products;
    }
    throw new Error("no product found");
  } catch (err) {
    throw err;
  }
}

async function getProductFromId(id) {
  try {
    const products = await user.getProductById(id);
    if (products) {
      return products;
    }
    return {
      message: "no product found",
    };
  } catch (err) {
    throw err;
  }
}
getProductFromId("6329bbda26f8c5c83a1a1df5");

//ADD PRODUCT

async function addProduct(name, category, price, quantity) {
  try {
    const productData = Schema.productModel(name, category, price, quantity);
    if (user.addNewProduct(productData)) {
      return "product added";
    } else {
      throw new Error("error occur");
    }
  } catch (err) {
    console.log(err.message);
    throw err;
  }
}

// addProduct("Pants", "Clothing", 3000, 20);

// SEARCH PRODUCT

async function searchProduct(keyword) {
  try {
    const res = await user.searchProductByKeyWords(keyword);
    return res;
  } catch (err) {
    throw err;
  }
}

// searchProduct("C");

//REMOVE PRODUCT
async function removeProducts(id) {
  try {
    // console.log(id)
    if (await user.removeProduct(id)) {
      return "product removed successfully";
    }
  } catch (err) {
    throw err;
  }
}
// removeProducts("6329a4add90158a888242f34")

// UPDATE PRODUCT

async function updateProduct(productId, productInfo) {
  try {
    if (await user.updateProducts(productId, productInfo)) {
      return "product updated";
    }
    throw new Error("error while updating");
  } catch (err) {
    throw err;
  }
}
const data = { quantity: 60, price: 5000 };
// updateProduct("632444d76be6b79c7bca24c4", data );

module.exports = {
  addProduct,
  searchProduct,
  updateProduct,
  removeProducts,
  getProducts,
  getProductFromId,
};
