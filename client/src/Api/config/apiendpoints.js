export const usersEnd = {
  signin: {
    url: "/user/login",
    method: "POST",
  },
  SignUp: {
    url: "/user/addUser",
    method: "POST",
  },
  getAll: {
    url: "/user/get",
    method: "GET",
  },
  //   remove: {
  //     url: "user/removeUser/:id",
  //     method: "DELETE",
  //   },
};

export const productEnd = {
  all: {
    url: "/product",
    method: "GET",
  },
  search: {
    url: "/product/searchProduct/:keyword",
    method: "GET",
  },
  getOne: {
    url: "/product/getProductFromId/:id",
    method: "GET",
  },
  add: {
    url: "/product/addNewProduct",
    method: "POST",
  },
  remove: {
    url: "/product/removeProduct/:id",
    method: "DELETE",
  },
};

export const cartEnd = {
  add: {
    url: "/cart/addToCart/:id",
    method: "POST",
  },
  getOne: {
    url: "/cart/getUsersCart/:id",
    method: "GET",
  },
};

export const orderEnd = {
  place: {
    url: "/order/placeOrder/:id",
    method: "POST",
  },
  getAll: {
    url: "/order",
    method: "GET",
  },
  getOne: {
    url: "/order/getOrder/:id",
    method: "GET",
  },
  update: {
    url: "/order/updateProductOnOrder/:id",
    method: "PUT",
  },
  return: {
    url: "/order/returnOrder/:id",
    method: "PUT",
  },
  refund: {
    url: "/order/trackRefundUpdates/:id",
    method: "GET",
  },
  updateAddress: {
    url: "/order/updateAddress/:id",
    method: "PUT",
  },
  updatePaymentMethod: {
    url: "/order/updatePaymentMethod/:id",
    method: "PUT",
  },
  updateShipment: {
    url: "/order/updateShipment/:id",
    method: "PUT",
  },
};
