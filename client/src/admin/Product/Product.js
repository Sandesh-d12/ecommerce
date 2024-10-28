import React from "react";
import { useDispatch } from "react-redux";
import { add } from "../../reducers/productSlice";
import { useFormik } from "formik";
import {
  Typography,
  Container,
  Box,
  Grid,
  TextField,
  CssBaseline,
  Button,
} from "@mui/material";

export default function Product() {
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      name: "",
      category: "",
      price: "",
      quantity: "",
    },

    onSubmit: async (values) => {
      console.log(values);

      const payload = {
        name: values.name,
        category: values.category,
        price: values.price,
        quantity: values.quantity,
      };
      console.log(payload);
      dispatch(add(payload));
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
          Add products
        </Typography>
        <Box component={"form"} onSubmit={formik.handleSubmit}>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              name="name"
              label="name"
              type="name"
              id="name"
              value={formik.values.name}
              onChange={formik.handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              name="category"
              label="category"
              type="category"
              id="category"
              value={formik.values.category}
              onChange={formik.handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              id="price"
              type="price"
              label="price"
              value={formik.values.price}
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
            Add Product
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
