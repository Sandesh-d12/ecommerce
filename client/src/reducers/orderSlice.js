import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiBase } from "../Api/config/config";
import { orderEnd } from "../Api/config/apiendpoints";
import { toast } from "react-hot-toast";
import { useState } from "react";
import { useSelector } from "react-redux";

export const order = createAsyncThunk("/order/placeOrder", async (data) => {
  try {
    const ep = { ...orderEnd.place };
    console.log(ep);
    console.log("slice::", data.id);
    const result = await apiBase({
      apiDetails: ep,
      body: data,
      path: { id: data.id },
    });
    console.log(result);
    return result;
  } catch (err) {
    return err;
  }
});

export const getOrder = createAsyncThunk("order/getOrder", async (data) => {
  try {
    console.log(data);
    console.log("oooo");

    const ep = { ...orderEnd.getOne };
    console.log("orderSlice::", data);
    const result = await apiBase({ apiDetails: ep, path: { id: data.id } });
    console.log(result);
    return result;
  } catch (err) {
    return err;
  }
});

export const updateOrder = createAsyncThunk(
  "order/updateOrder",
  async (data) => {
    try {
      console.log(data);
      const ep = { ...orderEnd.update };
      const result = await apiBase({
        apiDetails: ep,
        path: { id: data.orderId },
        body: { id: data.productId, quantity: data.quantity },
      });
      console.log(result);
      return result;
    } catch (err) {
      return err;
    }
  }
);

export const updateAddress = createAsyncThunk(
  "order/updateAddress",
  async (data) => {
    try {
      console.log(data);
      const ep = { ...orderEnd.updateAddress };
      const result = await apiBase({
        apiDetails: ep,
        path: { id: data.orderId },
        // body: {
        //   country: data.Country,
        //   district: data.District,
        //   town: data.Town,
        //   houseNumber: data.house_number,
        // },
        body: data,
      });
      console.log(result);
      return result;
    } catch (err) {
      return err;
    }
  }
);

export const orders = createAsyncThunk("/order", async () => {
  try {
    const ep = { ...orderEnd.getAll };
    const result = await apiBase({ apiDetails: ep });
    console.log("orderSlice:::", result);
    return result;
  } catch (err) {
    return err;
  }
});

export const orderSlice = createSlice({
  name: "orderSlice",
  initialState: {
    user_id: "",
    // products: [],
    // total_cost: "",
    payment: {},
    shipment: {},
    status: null,
    message: "",
    loading: "false",
  },
  extraReducers: (builder) => {
    builder
      .addCase(order.fulfilled, (state, action) => {
        let data = action?.payload;
        state.status = "success";
        state.message = data?.data.message;
        state.orderId = data?.data.orderId;
        state.loading = false;
        state.order = data;
        console.log(data);
        console.log(action);

        toast.success("order placed successful");
      })
      .addCase(order.pending, (state, action) => {
        let data = action?.payload;
        state.status = "loading";
        state.message = data?.data;
        state.loading = true;
        console.log(action);
      })
      .addCase(order.rejected, (state, action) => {
        console.log(action);
        let data = action?.payload;
        state.status = "failed";
        state.message = data?.data;
        state.loading = false;
        console.log(action);
      })
      .addCase(getOrder.fulfilled, (state, action) => {
        let data = action?.payload;
        state.status = "success";
        state.message = data?.data;
        state.loading = false;
        state.getOrder = data;
        console.log(data);
      })
      .addCase(getOrder.pending, (state, action) => {
        let data = action?.payload;
        state.status = "loading";
        // state.status = false
        state.message = data?.data;
        state.loading = true;
        console.log(action);
      })
      .addCase(getOrder.rejected, (state, action) => {
        console.log(action);
        let data = action?.payload;
        state.status = "failed";
        state.message = data?.data;
        state.loading = false;
        console.log(action);
      })
      .addCase(updateOrder.fulfilled, (state, action) => {
        let data = action?.payload;
        state.status = "success";
        state.message = data?.data;
        state.loading = false;
        console.log(data);
      })
      .addCase(updateOrder.pending, (state, action) => {
        let data = action?.payload;
        state.status = "loading";
        // state.status = false
        state.message = data?.data;
        state.loading = true;
        console.log(action);
      })
      .addCase(updateOrder.rejected, (state, action) => {
        console.log(action);
        let data = action?.payload;
        state.status = "failed";
        state.message = data?.data;
        state.loading = false;
        console.log(action);
      })
      .addCase(updateAddress.fulfilled, (state, action) => {
        let data = action?.payload;
        state.status = "success";
        state.message = data?.data;
        state.loading = false;
        console.log(data);
        console.log(action);
      })
      .addCase(updateAddress.pending, (state, action) => {
        let data = action?.payload;
        state.status = "loading";
        // state.status = false
        state.message = data?.data;
        state.loading = true;
        console.log(action);
      })
      .addCase(updateAddress.rejected, (state, action) => {
        console.log(action);
        let data = action?.payload;
        state.status = "failed";
        state.message = data?.data;
        state.loading = false;
        console.log(action);
      })
      .addCase(orders.fulfilled, (state, action) => {
        let data = action.payload.data;
        state.status = true;
        console.log(data);
        // console.log(action);
        state.orders = data;
      })
      .addCase(orders.pending, (state, action) => {
        state.status = false;
        console.log(action);
      })
      .addCase(orders.rejected, (state, action) => {
        state.status = false;
        console.log(action);
      });
  },
});

export default orderSlice.reducer;
