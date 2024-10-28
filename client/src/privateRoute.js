import "./App.css";
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Admin from "./admin/Admin";
import All from "./admin/Users/All";
import Info from "./admin/Users/Info";
import Product from "./admin/Product/Product";
import Update from "./admin/order/UpdateProduct";
import Remove from "./admin/Product/Remove";
import AllOrder from "./admin/order/AllOrder";
import View from "./admin/order/View";
import UpdateAddress from "./admin/order/UpdateAddress";
function PrivateApp() {
  return (
    <>
      <Routes>
        <Route element={<Admin />}>
          <Route path="/users" element={<All />} />
          <Route path="/info" element={<Info />} />
          <Route path="/product" element={<Product />} />
          <Route path="/remove" element={<Remove />} />
          <Route path="/allOrder" element={<AllOrder />} />
          <Route path="/update/:id" element={<Update />} />
          <Route path="/updateAddress/:id" element={<UpdateAddress />} />

          <Route path="/view/:id" element={<View />} />
          <Route path="*" element={<Navigate replace to="/" />} />
        </Route>
      </Routes>
    </>
  );
}

export default PrivateApp;
