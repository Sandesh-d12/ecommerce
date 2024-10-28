import React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { OrderValidation } from "../../Validation/Validation";
import { order } from "../../reducers/orderSlice";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";

export const OrderDetails = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const id = user.id;

  const formik = useFormik({
    initialValues: {
      paymentType: "",
      paymentStatus: "",
      locationType: "",
      country: "",
      district: "",
      town: "",
      houseNumber: "",
    },
    validationSchema: OrderValidation,

    onSubmit: async (values) => {
      const payload = {
        payment: {
          type: values.paymentType,
          status: "paid",
        },
        shipment: {
          status: "awaiting",
          location_type: values.locationType,
          address: {
            country: values.country,
            district: values.district,
            town: values.town,
            house_number: values.houseNumber,
          },
        },
      };
      console.log(values);
      dispatch(order({ ...payload, id }));
      navigate("/order/getOrder");
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
          ORDER DETAILS
        </Typography>
        <Box
          component="form"
          noValidate
          onSubmit={formik.handleSubmit}
          sx={{ mt: 3 }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel id="paymentType">payment type</InputLabel>
                <Select
                  labelId="payment type"
                  id="paymentType"
                  name="paymentType"
                  value={formik.values.paymentType}
                  label="Payment Type"
                  onChange={formik.handleChange}
                  error={
                    formik.touched.paymentType &&
                    Boolean(formik.errors.paymentType)
                  }
                >
                  <MenuItem value={"esewa"}>esewa</MenuItem>
                  <MenuItem value={"khalti"}>khalti</MenuItem>
                  <MenuItem value={"cash on delivery"}>
                    cash on delivery
                  </MenuItem>
                  <MenuItem value={"paypal"}>paypal</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="status"
                label="Payment Status"
                name="paymentStatus"
                autoComplete="family-name"
                value={formik.values.paymentStatus}
                onChange={formik.handleChange}
                error={
                  formik.touched.paymentStatus &&
                  Boolean(formik.errors.paymentStatus)
                }
                helperText={
                  formik.touched.paymentStatus && formik.errors.paymentStatus
                }
              />
            </Grid>
            <Box
              sx={{
                marginTop: 8,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Typography component="h1" variant="h5">
                SHIPMENT DETAILS
              </Typography>
            </Box>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="location"
                label="Location Type"
                name="locationType"
                value={formik.values.locationType}
                onChange={formik.handleChange}
                error={
                  formik.touched.locationType &&
                  Boolean(formik.errors.locationType)
                }
                helperText={
                  formik.touched.locationType && formik.errors.locationType
                }
              />
            </Grid>
            <Box
              sx={{
                marginTop: 8,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Typography component="h1" variant="h6">
                ADDRESS
              </Typography>
            </Box>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="country"
                label="Country"
                type="Country"
                id="country"
                value={formik.values.country}
                onChange={formik.handleChange}
                error={formik.touched.country && Boolean(formik.errors.country)}
                helperText={formik.touched.country && formik.errors.country}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="district"
                label="District"
                type="district"
                id="district"
                value={formik.values.district}
                onChange={formik.handleChange}
                error={
                  formik.touched.district && Boolean(formik.errors.district)
                }
                helperText={formik.touched.district && formik.errors.district}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="town"
                type="town"
                label="Town"
                value={formik.values.town}
                onChange={formik.handleChange}
                error={formik.touched.town && Boolean(formik.errors.town)}
                helperText={formik.touched.town && formik.errors.town}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                address="houseNumber"
                id="houseNumber"
                label="House Number"
                onChange={formik.handleChange}
                error={
                  formik.touched.houseNumber &&
                  Boolean(formik.errors.houseNumber)
                }
                helperText={
                  formik.touched.houseNumber && formik.errors.houseNumber
                }
              />
            </Grid>
            <Grid item xs={12}></Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            href=""
            sx={{ mt: 3, mb: 2 }}
          >
            Place Order
          </Button>
        </Box>
      </Box>
    </Container>
  );
};
