const router = require("express").Router();
const userApi = require("../API/userApi");
const productApi = require("../API/productApi");
const cartApi = require("../API/cartApi");
const orderApi = require("../API/orderApi");

//USER
router.post("/user/addUser", userApi.addUser);
router.post("/user/login", userApi.logIn);
router.get("/user/get", userApi.getAll);
router.delete("/user/removeUser/:id", userApi.removeUser);

//PRODUCT
router.post("/product/addNewProduct", productApi.addNewProduct);
router.get("/product/searchProduct/:keyword", productApi.searchProduct);
router.get("/product", productApi.allProducts);
router.get("/product/getProductFromId/:id", productApi.getProductFromId);
router.delete("/product/removeProduct/:id", productApi.removeProduct);
router.put("/product/updateProduct/:id", productApi.updateProduct);

//CART
router.post("/cart/addToCart/:id", cartApi.addToCart);
router.put("/cart/updateProductOnCart/:id", cartApi.updateProductOnCart);
router.delete("/cart/removeCart/:id", cartApi.removeCart);
router.delete("/cart/removeProductFromCart/:id", cartApi.removeProductFromCart);
router.get("/cart/getUsersCart/:id", cartApi.getUsersCart);

//ORDER
router.post("/order/placeOrder/:id", orderApi.placeOrder);
router.put("/order/updateProductOnOrder/:id", orderApi.updateProductOnOrder);
router.get("/order/trackOrder/:id", orderApi.trackOrder);
router.put("/order/returnOrder/:id", orderApi.returnOrder);
router.get("/order/trackRefundUpdates/:id", orderApi.trackRefundUpdates);
router.put("/order/updateAddress/:id", orderApi.updateAddress);
router.put("/order/updatePaymentMethod/:id", orderApi.updatePaymentMethod);
router.put("/order/updateShipment/:id", orderApi.updateShipment);
router.get("/order/getOrder/:id", orderApi.getOrder);
router.get("/order", orderApi.allOrder);

module.exports = router;
