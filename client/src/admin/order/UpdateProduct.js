import React from "react";
import { useDispatch } from "react-redux";
import { updateOrder } from "../../reducers/orderSlice";
import { useFormik } from "formik";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import {
  Typography,
  Container,
  Box,
  Grid,
  TextField,
  CssBaseline,
  Button,
} from "@mui/material";

export default function Update() {
  const order = useSelector((state) => state.Order);
  console.log(order);
  const { id } = useParams();
  console.log(id);
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      productId: "",
      quantity: "",
      orderId: id,
    },

    onSubmit: async (values) => {
      console.log(values);
      dispatch(updateOrder(values));
    },
  });
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          Update Order
        </Typography>
        <Box component={"form"} onSubmit={formik.handleSubmit}>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              name="productId"
              label="productId"
              type="productId"
              id="productId"
              value={formik.values.productId}
              onChange={formik.handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              address="quantity"
              id="quantity"
              label="quantity"
              value={formik.values.quantity}
              onChange={formik.handleChange}
            />
          </Grid>
          <Grid item xs={12}></Grid>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            href=""
            sx={{ mt: 3, mb: 2 }}
          >
            Update Order
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
