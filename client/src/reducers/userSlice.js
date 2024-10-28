import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiBase } from "../Api/config/config";
import { usersEnd } from "../Api/config/apiendpoints";
import { toast } from "react-hot-toast";

export const logIn = createAsyncThunk("user/signIn", async (data) => {
  const ep = { ...usersEnd.signin };
  const result = await apiBase({ apiDetails: ep, body: data });
  // console.log(result)
  return result;
});

export const signedUp = createAsyncThunk("form/signUp", async (data) => {
  try {
    const ep = { ...usersEnd.SignUp };
    const result = await apiBase({ apiDetails: ep, body: data });
    return result;
  } catch (err) {
    return err;
  }
});

export const getAll = createAsyncThunk("admin/all", async () => {
  console.log("okay");
  const ep = { ...usersEnd.getAll };
  const result = await apiBase({ apiDetails: ep });
  console.log(result);
  return result;
});
// export const removeUser = createAsyncThunk("user/remove", async (id) => {
//   const ep = { ...usersEnd.remove };
//   const result = await apiBase({ apiDetails: ep, path: { id: id } });
//   console.log(result);
//   return result;
// });

export const userCurrent = localStorage.getItem("persist:customers");
export const userC = localStorage.getItem("persist:user");

const iState = {
  id: "",
  firstName: "",
  lastName: "",
  email: "",
  address: "",
  role: "",
  // signedIn: userCurrent?.user?true:false,
  signedIn: false,
  status: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState: iState,
  reducers: {
    signOut: (state) => {
      return {
        ...(state = iState),
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(logIn.fulfilled, (state, action) => {
        let data = action?.payload?.data?.data;
        state.id = data?._id;
        state.firstName = data?.firstName;
        state.lastName = data?.lastName;
        state.email = data?.email;
        state.address = data?.address;
        state.role = data?.role;
        state.signedIn = true;
        state.status = true;
      })
      .addCase(logIn.pending, (state, action) => {
        state.status = false;
        console.log(action);
      })
      .addCase(logIn.rejected, (state, action) => {
        state.status = true;
        state.signedIn = false;
        console.log(action);
      })
      .addCase(signedUp.fulfilled, (state, action) => {
        let data = action.payload.data.data;
        state.firstName = data.firstName;
        state.lastName = data.lastName;
        state.email = data.email;
        state.address = data.address;
        state.signedup = true;
        console.log(data);
        toast.success("signUp successful");
      })
      .addCase(signedUp.pending, (state, action) => {
        console.log(action);
      })
      .addCase(signedUp.rejected, (state, action) => {
        console.log(action);
      })
      .addCase(getAll.fulfilled, (state, action) => {
        let data = action?.payload?.data;
        state.getAll = data;
        console.log(data);
      })
      .addCase(getAll.pending, (state, action) => {
        console.log(action);
      })
      .addCase(getAll.rejected, (state, action) => {
        console.log(action);
      });
    // .addCase(removeUser.fulfilled, (state, action) => {
    //   let data = action?.payload?.data;
    //   // state.firstName = data.firstName;
    //   // state.lastName = data.lastName;
    //   // state.email = data.email;
    //   // state.address = data.address;
    //   state.removeUser = data;
    // })
    // .addCase(removeUser.pending, (state, action) => {
    //   console.log(action);
    // })
    // .addCase(removeUser.rejected, (state, action) => {
    //   console.log(action);
    // });
  },
});

export const { signIn, signUp, signOut, users } = userSlice.actions;
export default userSlice.reducer;
