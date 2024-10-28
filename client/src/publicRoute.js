import "./App.css";
import React from "react";
import Home from "./features/Home";
import SignUp from "./features/user/SignUp";
import Header from "./Layout/Header";
import Products from "./features/product/products";
import { Routes, Route, Navigate } from "react-router-dom";
import SignIn from "./features/user/SignIn";
import Profile from "./features/user/profile";

import Search from "./features/product/search";
import { ProductDetails } from "./features/product/productDetails";
import { OrderDetails } from "./features/order/order";
import Orders from "./features/order/orderDetails";
import TrackMyOrder from "./features/order/trackMyOrder";
import OrderInfo from "./features/order/orderInfo";
import Carts from "./features/cart/cart";

function PublicApp() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Header />}>
          <Route path="/home" element={<Home />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/products" element={<Products />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/cart/getUsersCart" element={<Carts />} />
          <Route path="/search" element={<Search />} />
          <Route path="/productDetails/:id" element={<ProductDetails />} />
          <Route path="/order/:id" element={<OrderDetails />} />
          <Route path="/order/getOrder" element={<Orders />} />
          <Route path="/order/trackMyOrder" element={<TrackMyOrder />} />
          <Route path="/orderInfo" element={<OrderInfo />} />
        </Route>
      </Routes>
    </>
  );
}

export default PublicApp;
