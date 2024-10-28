import * as React from "react";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { products } from "../../reducers/productSlice";
import { useSelector } from "react-redux";

export default function Products() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const product = useSelector((state) => state.product);
  useEffect(() => {
    console.log(product);
    dispatch(products());
  }, []);
  const handleClick = async (values) => {
    console.log(values);
    navigate(`/productDetails/${values._id}`);
  };

  return (
    <div>
      <main>
        <Box
          sx={{
            bgcolor: "background.paper",
            pt: 3,
            pb: 1,
          }}
        ></Box>
        <Container sx={{ py: 8 }} maxWidth="md">
          <Grid container spacing={4}>
            {product?.products?.map((data) => (
              <Grid item key={data._id} xs={10} sm={6} md={4}>
                <Card
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    <CardMedia
                      component="img"
                      sx={{
                        height: "200px",
                        width: "auto",
                        objectFit: "contain",
                        textAlign: "center",
                        pt: "20.25%",
                      }}
                      image="https://api.lorem.space/image/movie?w=150&h=220"
                      alt="random"
                    />
                  </Box>
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h2">
                      {data.name}
                    </Typography>
                    <Typography></Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small">{data.category}</Button>
                    <Button size="small">Rs {data.price}</Button>
                    <Button size="small"></Button>
                  </CardActions>
                  <Box sx={{ display: "flex", justifyContent: "space-around" }}>
                    <Button
                      type="submit"
                      variant="contained"
                      onClick={() => handleClick(data)}
                      sx={{ mt: 3, mb: 2 }}
                      // href="`/productDetails/${data._id}`"
                    >
                      <Typography textAlign="center" variant="h6">
                        {" "}
                        Product Details{" "}
                      </Typography>
                    </Button>
                  </Box>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </main>
    </div>
  );
}
