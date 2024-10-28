import "./App.css";
import React from "react";
import { Toaster } from "react-hot-toast";
import { useSelector } from "react-redux";
// import PrivateApp from "./privateRoute";
// import PublicApp from "./publicRoute";

const PrivateApp = React.lazy(() => import("./privateRoute"));
const PublicApp = React.lazy(() => import("./publicRoute"));

function App() {
  const { role, status } = useSelector((state) => state.user);
  // const role = "admin";
  React.useEffect(() => {
    console.log(role);
  }, [role]);

  return (
    <>
      <div className="App">
        <Toaster />
        <React.Suspense fallback="...Loading">
          {role === "admin" ? <PrivateApp /> : <PublicApp />}
          {/* {role === "user" ? <PublicApp /> : <PrivateApp />} */}
        </React.Suspense>
      </div>
    </>
  );
}

export default App;
