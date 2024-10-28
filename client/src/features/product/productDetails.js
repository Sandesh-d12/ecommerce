import React from "react";
import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { productDetails } from "../../reducers/productSlice";
import { useEffect } from "react";
import { cart } from "../../reducers/cartSlice";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export const ProductDetails = ({ pro }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();
  const [quantityValue, setQuantityValue] = React.useState(1);
  const { selectedProduct } = useSelector((state) => state.product);
  const user = useSelector((state) => state.user);
  const Cart = useSelector((state) => state.cart);

  const userId = user.id;
  useEffect(() => {
    if (id && id !== "") {
      dispatch(productDetails(id));
    }
  }, [id]);
  console.log(id);
  useEffect(() => {
    console.log(selectedProduct);
  }, [selectedProduct]);

  function handleIncrease() {
    if (quantityValue < selectedProduct.quantity) {
      setQuantityValue(quantityValue + 1);
    }
  }

  function handleDecrease() {
    if (quantityValue > 1) {
      setQuantityValue(quantityValue - 1);
    }
  }

  function handleAddToCart() {
    let payload = {
      product: { id: id, quantity: quantityValue },
      userId: userId,
    };
    dispatch(cart(payload));
    alert("cart added successfully");
  }

  // useEffect(() => {
  //   if (Cart.status === true && Cart.loading === false) {
  //   // navigate("/cart/getUsersCart");
  //   }
  //   if(Cart.status !== null ){
  //     dispatch(cart({}));

  //   }

  // }, [Cart]);
  console.log(Cart);

  return (
    <Box>
      <Box
        sx={{
          top: "0",
          marginTop: "10px",
          display: "flex",
          justifyContent: "center",
        }}
      ></Box>
      <Grid item xl={5} lg={5} md={5} sm={5} xs={5}>
        <Grid container>
          <Grid item xl={15} lg={15} md={15} sm={15} xs={15}>
            <Box>
              <Typography>PRODUCT DETAILS</Typography>
            </Box>
            <Box sx={{ textAlign: "left" }}>
              <Typography>Category: {selectedProduct?.category} </Typography>
              <Typography>Price: Rs. {selectedProduct?.price}</Typography>
              <Typography>
                Available Quantity: {selectedProduct?.quantity}
              </Typography>
            </Box>
          </Grid>
          <Box
            sx={{
              margin: "10px 0 20px 0",
              boxShadow: "5px 10px #888888",
            }}
          ></Box>
          <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
            <Box>
              <Box
                sx={{
                  border: "solid blue 2px",
                  margin: "10px 0 20px 0",
                  boxShadow: "5px 10px #888888",
                }}
              >
                <Box sx={{ margin: "5px 0" }}>
                  <Typography variant="h4">Selected Quantities</Typography>
                </Box>
                <Box>
                  <Box sx={{ textAlign: "center" }}>
                    <TextField
                      id="quantity"
                      label="My Quantity"
                      InputProps={{
                        readOnly: true,
                      }}
                      value={quantityValue}
                    />
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-around",
                      margin: "10px 0",
                    }}
                  >
                    <Button
                      variant="outlined"
                      color="success"
                      onClick={handleDecrease}
                    >
                      Decrease
                    </Button>
                    <Button
                      variant="outlined"
                      color="success"
                      onClick={handleIncrease}
                    >
                      Increase
                    </Button>
                  </Box>
                </Box>
              </Box>
              <Box>
                <Button
                  type="submit"
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  onClick={handleAddToCart}
                >
                  {/* <Link
                    to={}
                    style={{ textDecoration: "none", color: "#fff" }}
                  > */}
                  <Typography textAlign="center" variant="h6">
                    Add To Cart
                  </Typography>
                  {/* </Link> */}
                </Button>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};
