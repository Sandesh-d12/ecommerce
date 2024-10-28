import React from "react";
import { Box, Container, Typography, TextField, Button } from "@mui/material";
import { getOrder } from "../../reducers/orderSlice";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function TrackMyOrder() {
  const [Order, setOrder] = useState({});
  const [id, setId] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const order = useSelector((state) => state.Order);
  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   dispatch(getOrder({ id:id }));
  // };

  useEffect(() => {
    setOrder(order.message);
  console.log(order.orderId);
  }, [order]);

  function handleSearch(e) {
    e.preventDefault();
    dispatch(getOrder({ id }));
    navigate("/orderInfo");
  }


  return (
    <>
      <Container sx={{ maxWidth: "100%" }}>
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h5">
            Search Your Orders
          </Typography>
          <Box
            component="form"
            // onSubmit={(e) => handleSubmit(e)}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="search"
              label="Enter Order Id"
              autoComplete="search"
              autoFocus
              onChange={(e) => setId(e.target.value)}
            />
            <Box>
              <Button
                type="submit"
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={handleSearch}
              >
                <Typography textAlign="center" variant="h6">
                  Search
                </Typography>
              </Button>
            </Box>
          </Box>
        </Box>
        <Box>
        <Typography textAlign="center" variant="h6">
                 Order id::{order.orderId}
                </Typography> 
        </Box>
      </Container>
    </>
  );
}
