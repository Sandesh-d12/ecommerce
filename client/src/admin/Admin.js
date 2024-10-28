import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import { signOut, getAll } from "../reducers/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
import Products from "../features/product/products";
import { Select } from "@mui/material";
import { useState } from "react";
const pages = [
  { id: 1, title: "Users", href: "/users" },
  {
    id: 2,
    title: "Products",
    href: "/product",
  },
  {
    id: 3,
    title: "Orders",
    href: "/orders",
  },
];

const settings = [
  { id: 1, title: "Logout" },
  {
    id: 2,
    title: "profile",
  },
];

const product = [
  { id: 1, title: "Add" },
  { id: 2, title: "Remove" },
];

function Admin() {
  const [anchorElNav, setAnchorElNav] = React.useState(0);
  const [anchorElUser, setAnchorElUser] = React.useState(0);
  const [anchorElProduct, setAnchorElProduct] = React.useState(0);

  const [anchorEl1, setAnchorEl1] = useState(null);
  const [value, setValue] = useState(product[0]);

  const handleClick = (event) => {
    setAnchorEl1(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl1(null);
  };

  const handleMenuItemClick = (event) => {
    setValue(event.target.value);
    setAnchorEl1(null);
  };
  // const [id, setId] = React.useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  console.log(user);
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleOpenProductMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const handleGetAllUsers = () => {
    dispatch(getAll());
    navigate("/users");
    // window.location.replace("all");
  };

  const handleProduct = () => {
    navigate("/product");
    // window.location.replace("all");
  };

  const handleOrder = () => {
    navigate("/allOrder");
    // window.location.replace("all");
  };
  const handleRemoveProduct = () => {
    navigate("/remove");
    <Products />;
    // window.location.replace("all");
  };

  const handleLogedOut = () => {
    dispatch(signOut());
    navigate("/signin");
  };
  // const [anchorEl, setAnchorEl] = React.useState(null);
  // const handleClose = () => {
  //   setAnchorEl(null);
  // };

  return (
    <>
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
            <Typography
              variant="h6"
              noWrap
              component="a"
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              ADMIN
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
            </Box>
            <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
            <Typography
              variant="h5"
              noWrap
              component="a"
              sx={{
                mr: 2,
                display: { xs: "flex", md: "none" },
                flexGrow: 1,
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              ADMIN
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              <Button
                sx={{ my: 2, color: "white", display: "block" }}
                onClick={handleGetAllUsers}
              >
                {pages[0].title}
              </Button>
            </Box>
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              <Button
                sx={{ my: 2, color: "white", display: "block" }}
                onClick={handleOrder}
              >
                {pages[2].title}
              </Button>
            </Box>
            <Box>
              <Button
                aria-controls="simple-menu"
                aria-haspopup="true"
                onClick={handleClick}
              >
                Product
              </Button>
              {/* <Button
                onClick={handleOpenProductMenu}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                {pages[1].title}
              </Button> */}
              <Menu
                id="simple-menu"
                anchorEl={anchorEl1}
                keepMounted
                open={Boolean(anchorEl1)}
                onClose={handleClose}
              >
                {/* {options.map((option) => ( */}
                <MenuItem
                  key={product[0].id}
                  value={product[0].title}
                  onClick={handleProduct}
                >
                  {product[0].title}
                </MenuItem>
                <MenuItem
                  key={product[1].id}
                  value={product[1].title}
                  onClick={handleRemoveProduct}
                >
                  {product[1].value}
                </MenuItem>
                {/* ))} */}
              </Menu>
            </Box>
            {/* <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              <Box sx={{ flexGrow: 0 }}>
                <Tooltip title="Open product features">
                  <Button
                    onClick={handleOpenProductMenu}
                    sx={{ my: 2, color: "white", display: "block" }}
                  >
                    {pages[1].title}
                  </Button>
                </Tooltip>
                <Menu
                  id="product-appbar"
                  anchorEl={anchorEl}
                  keepMounted
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                  <MenuItem onClick={() => handleProduct()} href={"/product"}>
                    Add
                  </MenuItem>
                  <MenuItem
                    onClick={() => handleRemoveProduct()}
                    href={"/remove"}
                  >
                    Remove
                  </MenuItem>
                </Menu>
              </Box>
            </Box> */}
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                <MenuItem>
                  <Button onClick={() => handleLogedOut()}>
                    {settings[0].title}
                  </Button>
                </MenuItem>
                <MenuItem>
                  <Button href={"/info"} textAlign="center">
                    {settings[1].title}
                  </Button>
                </MenuItem>
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <Outlet />
    </>
  );
}
export default Admin;
