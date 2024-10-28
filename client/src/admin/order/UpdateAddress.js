import React from "react";
import { useDispatch } from "react-redux";
import { updateAddress } from "../../reducers/orderSlice";
import { useFormik } from "formik";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useEffect } from "react";

import {
  Typography,
  Container,
  Box,
  Grid,
  TextField,
  CssBaseline,
  Button,
} from "@mui/material";

export default function UpdateAddress() {
  const order = useSelector((state) => state.Order);
  console.log(order);
  const { id } = useParams();
  console.log(id);
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      orderId: id,
      country: "",
      district: "",
      town: "",
      houseNumber: 1240,
    },

    onSubmit: async (values) => {
      console.log(values);
      dispatch(updateAddress(values));
    },
  });

  //   useEffect(() => {
  //     dispatch(updateAddress());
  //   }, []);
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
          Update Address
        </Typography>
        <Box component={"form"} onSubmit={formik.handleSubmit}>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              name="country"
              label="country"
              type="country"
              id="country"
              value={formik.values.country}
              onChange={formik.handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              address="district"
              id="district"
              label="district"
              value={formik.values.district}
              onChange={formik.handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              name="town"
              label="town"
              type="town"
              id="town"
              value={formik.values.town}
              onChange={formik.handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              address="House Number"
              id="houseNumber"
              label="House Number"
              value={formik.values.houseNumber}
              onChange={formik.handleChange}
            />
          </Grid>
        </Box>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          href=""
          sx={{ mt: 3, mb: 2 }}
        >
          Update Address
        </Button>
      </Box>
    </Container>
  );
}
