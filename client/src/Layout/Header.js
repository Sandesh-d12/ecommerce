import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { signOut } from "../reducers/userSlice";
import { Grid } from "@mui/material";
import { Outlet } from "react-router-dom";

const Header = () => {
  // const {firstName} = useSelector(state=>state.user)
  const { signedIn } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleClick = () => {
    navigate("/signin");
  };
  const handleLogedOut = () => {
    dispatch(signOut());
    navigate("/signin");
  };

  const user = useSelector((state) => state.user);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="end"
            color="default"
            aria-label="menu"
            sx={{ my: 2 }}
          ></IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            ECOM-PORTAL
          </Typography>
          <Button variant="contained" sx={{ my: 4, mx: 10 }}>
            <Link to="/"> Home</Link>
          </Button>
          <Button variant="contained" sixe="large" sx={{ my: 4, mx: 1.5 }}>
            <Link to="/order/trackMyOrder"> Track my Order</Link>
          </Button>
          {/* <Button variant="contained" sixe="large" sx={{ my: 4, mx: 1.5 }}>
            <Link to="/"> Cart</Link>
          </Button> */}
          <Button variant="contained" sx={{ my: 1, mx: 1.5 }}>
            <Link to="/products"> products</Link>
          </Button>

          <Button variant="contained" sx={{ my: 1, mx: 1.5 }}>
            <Link to="/profile"> Profile</Link>
          </Button>
          <Button variant="contained" sx={{ my: 1, mx: 1.5 }}>
            <Link to="/search"> Search Products</Link>
          </Button>
          <Box>
            <Link to={"/cart/getUsersCart"} style={{ textDecoration: "none" }}>
              <Box
                sx={{
                  color: "white",
                  marginTop: "3px",
                  boxShadow: "",
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="24"
                  viewBox="0 0 20 20"
                  width="24"
                  color="#fff"
                >
                  <path d="M0 0h24v24H0z" fill="none" />
                  <path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z" />
                </svg>
              </Box>
            </Link>
          </Box>
          <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
            <Box>
              {signedIn ? (
                <Button
                  onClick={handleLogedOut}
                  variant="contained"
                  sx={{ my: 1, mx: 1.5 }}
                >
                  Logout
                </Button>
              ) : (
                <Button
                  variant="contained"
                  sx={{ my: 1, mx: 1.5 }}
                  onClick={handleClick}
                >
                  {" "}
                  Signin{" "}
                </Button>
              )}
            </Box>
          </Grid>
        </Toolbar>
      </AppBar>
      <Outlet />
    </Box>
  );
};

export default Header;
