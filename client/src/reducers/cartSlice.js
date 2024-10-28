import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiBase } from "../Api/config/config";
import { cartEnd } from "../Api/config/apiendpoints";
import { toast } from "react-hot-toast";

export const cart = createAsyncThunk("cart/addToCart", async (data, state) => {
  try {
    console.log(data);
    // console.log(state);
    // console.log("cartslice");

    // state.status=false;
    const ep = {...cartEnd.add}
    const result = await apiBase({
      apiDetails: ep,
      body: data.product,
      path: { id: data.userId },
    });
    console.log(result);
    return result;
  } catch (err) {
    return err;
  }
});

export const getCart = createAsyncThunk("cart/getUsersCart", async (id) => {
  try {
    console.log(id);
    const ep = {...cartEnd.getOne}
    const result = await apiBase({ apiDetails: ep, path: {id:id}});
    console.log(result);
    return result;
  } catch (err) {
    return err;
  }
});

export const cartSlice = createSlice({
  name: "cartSlice",
  initialState: {
    user_id: "",
    products: [],
    status: null,
    message: "",
    loading: null,
    // status:null,
  },
  // reducers: {
  //   Cart: (state, action) => {
  //       state.user_id = action.payload?.user_id
  //       state.products = action.payload?.products
  //       state.status = action.payload?.status
  //   }
  // },

  extraReducers: (builder) => {
    builder
      .addCase(cart.fulfilled, (state, action) => {
        let data = action?.payload;
        // state.status = "success";
        state.status = true;
        state.message = data?.data;
        state.loading = false;
        console.log(action);
      })
      .addCase(cart.pending, (state, action) => {
        let data = action?.payload;
        // state.status = "loading";
        state.status = null
        state.message = data?.data;
        state.loading = true;
        console.log(action);
      })
      .addCase(cart.rejected, (state, action) => {
        let data = action?.payload;
        // state.status = "failed";
        state.status = false;
        state.message = data?.data;
        state.loading = false;
        console.log(action);
      })
      .addCase(getCart.fulfilled, (state, action) => {
        let data = action?.payload;
        state.user_id = data?.user_id;
        state.products = data?.products;
        // state.status= data?.status;
        console.log(data);
        state.getCart = data;
        console.log(action);
      })
      .addCase(getCart.pending, (state, action) => {
        let data = action?.payload;
        state.user_id = data?.user_id;
        state.products = data?.products;
        // state.status= data?.status;
        console.log(action);
      })
      .addCase(getCart.rejected, (state, action) => {
        let data = action?.payload;
        state.user_id = data?.user_id;
        state.products = data?.products;
        // state.status= data?.status;
        console.log(action);
      });
  },
});

export const Cart = cartSlice.actions;
export default cartSlice.reducer;
