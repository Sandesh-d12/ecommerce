var fs = require("fs/promises");
require("dotenv").config({ path: "../../.env" });
const filePath = process.env.CART_URL;

async function getCart() {
  try {
    const data = await fs.readFile(filePath, { encoding: "utf8" });
    return JSON.parse(data);
  } catch (err) {
    console.log(err.message);
  }
}

async function addToCart(cart) {
  try {
    fs.writeFile(filePath, JSON.stringify(cart, null, 2), function (error) {
      if (error) {
        return error;
      }
    });
    return true;
  } catch (err) {
    console.log(err.message);
    return false;
  }
}

async function addCart(cart) {
  try {
    const allCarts = await getCart();
    allCarts.push(cart);
    return addToCart(allCarts);
  } catch (err) {
    throw err;
  }
}

async function getCartFromId(user_id) {
  const allCart = await getCart();
  for (cart of allCart) {
    if (cart.user_id === user_id && cart.status ==="active") {
      return cart;
    }
  }
  return false;
}

async function getActiveCart(user_id) {
  const allCart = await getCart();
  for (cart of allCart) {
    if (cart.user_id === user_id && cart.status === "active") {
      return cart;
    }
  }
  return false;
}


async function updateCarts(cart) {
  try {
    const allCart = await getCart();

    for (let newCart of allCart) {
      if (newCart.user_id === cart.user_id && newCart.status === "active") {
        allCart[allCart.indexOf(newCart)] = cart;
        return addToCart(allCart);
      }
    }
    return false;
  } catch (err) {
    throw err;
  }
}




async function removeCart(id) {
  try {
    const allCart = await getCart();
    for (let i = 0; i < allCart.length; i++) {
      if (allCart[i].user_id === id && allCart[i].status === "active") {
        allCart.splice(i, 1);

        fs.writeFile(
          filePath,
          JSON.stringify(allCart, null, 2),
          function (error) {
            if (error) {
              throw error;
            }
          }
        );
        return true;
      }
    }
    throw new Error("no cart found");
  } catch (err) {
    throw err;
  }
}

async function removeProductFromCart(user_Id, product_Id) {
  try {
    const allCart = await getCart();
    for (let Cart of allCart) {
      if (Cart.user_id === user_Id && Cart.status === "active") {
        let i = 0;
        for (let product of Cart.products) {
          if (product.id === product_Id) {
            Cart.products.splice(i,1);
            fs.writeFile(
              filePath,
              JSON.stringify(allCart, null, 2),
              function (error) {
                if (error) {
                  throw error;
                }
              }
            )
            return true;
          }
          i++;
        }
      }
    }
    return false;
  } catch (err) {
    throw err;
  }
}

async function findCart(user_Id) {
  try {
    const allCart = await getCart();
    for (let cart of allCart) {
      if (cart.user_id === user_Id && cart.status === "active") {
        return cart;
      }
    }
    throw new Error("cart can't be found");
  } catch (err) {
    throw err;
  }
}

async function changeStatusOfCart(user_Id) {
  try {
    const allCart = await getCart();
    for (let i = 0; i < allCart.length; i++) {
      if (allCart[i].user_id === user_Id && allCart[i].status === "active") {
        allCart[i].status = "deactive";
        addToCart(allCart);
        return;
      }
    }
    throw new Error("cart cannot be found");
  } catch (err) {
    throw err;
  }
}

module.exports = {
  getCart,
  addToCart,
  getCartFromId,
  removeCart,
  removeProductFromCart,
  findCart,
  changeStatusOfCart,
  getActiveCart,
  addCart,
  updateCarts
};
