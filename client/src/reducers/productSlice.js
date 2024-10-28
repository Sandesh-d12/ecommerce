import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { apiBase } from "../Api/config/config";
import { productEnd } from "../Api/config/apiendpoints";

export const products = createAsyncThunk("product/allProduct", async () => {
  try {
    const ep = { ...productEnd.all };
    const result = await apiBase({ apiDetails: ep });
    console.log("productSlice:::", result);
    return result;
  } catch (err) {
    return err;
  }
});

export const searchProducts = createAsyncThunk(
  "product/searchProduct",
  async (keyword) => {
    try {
      const ep = { ...productEnd.search };
      const result = await apiBase({
        apiDetails: ep,
        path: { keyword: keyword },
      });
      return result;
    } catch (err) {
      return err;
    }
  }
);

export const productDetails = createAsyncThunk(
  "product/productDetail",
  async (id) => {
    try {
      const ep = { ...productEnd.getOne };
      const result = await apiBase({
        apiDetails: ep,
        path: { id: id },
      });
      return result;
    } catch (err) {
      return err;
    }
  }
);

export const add = createAsyncThunk("product/add", async (data) => {
  try {
    const ep = { ...productEnd.add };
    const result = await apiBase({ apiDetails: ep, body: data });
    return result;
  } catch (err) {
    return err;
  }
});

export const remove = createAsyncThunk("product/add", async (id) => {
  try {
    const ep = { ...productEnd.remove };
    const result = await apiBase({ apiDetails: ep, path: { id: id } });
    console.log(result);
    console.log(id);
    return result;
  } catch (err) {
    return err;
  }
});

const iState = {
  id: "",
  name: "",
  category: "",
  price: "",
  quantity: "",
  status: null,
};

export const productSlice = createSlice({
  name: "productSlice",
  initialState: {
    products: [],
    selectedProduct: {},
    status: null,
    // iState,
    // removeProduct: (state) => {
    //   return {
    //     ...(state = iState),
    //   };
    // },
  },
  reducers: {
    Product: (state, action) => {
      // state.productId = action.payload.productId
      // state.name = action.payload.name;
      // state.category = action.payload.category;
      // state.price = action.payload.price;
      // state.quantity = action.payload.quantity;
    },
    // searchProduct: (state, action) => {
    //   // state.productId = action.payload.productId
    //   state.name = action.payload.name;
    //   state.category = action.payload.category;
    //   state.price = action.payload.price;
    //   state.quantity = action.payload.quantity;
    // },
  },

  extraReducers: (builder) => {
    builder
      .addCase(products.fulfilled, (state, action) => {
        let data = action.payload.data;
        state.status = true;
        console.log(data);
        state.products = data;
      })
      .addCase(products.pending, (state, action) => {
        state.status = false;
        console.log(action);
      })
      .addCase(products.rejected, (state, action) => {
        state.status = false;
        console.log(action);
      })
      .addCase(searchProducts.fulfilled, (state, action) => {
        let data = action.payload.data;
        console.log(data);
        state.products = data;
      })
      .addCase(searchProducts.pending, (state, action) => {
        console.log(action);
      })
      .addCase(searchProducts.rejected, (state, action) => {
        console.log(action);
      })
      .addCase(productDetails.fulfilled, (state, action) => {
        let data = action?.payload?.data;
        console.log(data);
        state.selectedProduct = data;
      })
      .addCase(productDetails.pending, (state, action) => {
        console.log(action);
      })
      .addCase(productDetails.rejected, (state, action) => {
        console.log(action);
      })
      .addCase(add.fulfilled, (state, action) => {
        let data = action?.payload?.data;
        console.log(action);
        console.log(data);
        state.add = data;
      })
      .addCase(add.pending, (state, action) => {
        console.log(action);
      })
      .addCase(add.rejected, (state, action) => {
        console.log(action);
      });
    // .addCase(remove.fulfilled, (state, action) => {
    //   let data = action?.payload?.data;
    //   console.log(action);
    //   console.log(data);
    //   // state.remove = data;
    // })
    // .addCase(remove.pending, (state, action) => {
    //   console.log(action);
    // })
    // .addCase(remove.rejected, (state, action) => {
    //   console.log(action);
    // });
  },
});

export const { Product, searchProduct, productDetail, removeProduct } =
  productSlice.actions;
export default productSlice.reducer;
