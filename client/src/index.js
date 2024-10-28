import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";
import store from "./store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import PublicApp from "./publicRoute";
import PrivateApp from "./privateRoute";
import Admin from "./admin/Admin";
import Home from "./features/Home";
import SignIn from "./features/user/SignIn";
import Header from "./Layout/Header";

const root = ReactDOM.createRoot(document.getElementById("root"));
const persistor = persistStore(store);
root.render(
  // <React.StrictMode>
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <BrowserRouter>
        <App />
        {/* <Header /> */}
        {/* <Home /> */}
        {/* <SignIn /> */}
      </BrowserRouter>
    </PersistGate>
  </Provider>
  // </React.StrictMode>
);

reportWebVitals();
