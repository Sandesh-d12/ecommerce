import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getCart } from "../../reducers/cartSlice";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Box } from "@mui/system";
import { Button, Typography } from "@mui/material";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common,
    color: theme.palette.common.black,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 20,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function Carts() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const [cart, setCart] = React.useState(null);
  const Cart = useSelector((state) => state.cart);
  const id = user.signedIn ? user.id : "";
  useEffect(() => {
    if (id && id !== "") {
      dispatch(getCart(id));
    }
  }, [id]);

  useEffect(() => {
    setCart(Cart.getCart.data);
  }, [Cart]);

  function handleCheckIn() {
    navigate(`/order/${user.id}`);
  }
  console.log(Cart.products);

  return (
    <Box sx={{ padding: "0 50px" }}>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableRow>
                <StyledTableCell component="th" scope="row">
                  USER ID
                </StyledTableCell>
                <StyledTableCell align="right">{user.id}</StyledTableCell>
              </StyledTableRow>
            </TableRow>
            <TableRow>
              <StyledTableCell align="right">Quantity</StyledTableCell>
              <StyledTableCell align="right">ProductId</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cart !== null ? (
              cart?.products?.map((product) => {
                return (
                  <>
                    <StyledTableRow>
                      <StyledTableCell align="right">
                        {product.quantity}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {product.id}
                      </StyledTableCell>
                    </StyledTableRow>
                  </>
                );
              })
            ) : (
              <StyledTableRow>
                <StyledTableCell>no product found</StyledTableCell>
              </StyledTableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <Box>
        <Button
          type="submit"
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
          onClick={handleCheckIn}
        >
          <Typography variant="h6">Check In</Typography>
        </Button>
      </Box>
    </Box>
  );
}
