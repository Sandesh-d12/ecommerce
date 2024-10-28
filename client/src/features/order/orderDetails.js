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
import { useSelector } from "react-redux";
import { Box } from "@mui/system";
import { apiBase } from "../../Api/config/config";
import { orderEnd } from "../../Api/config/apiendpoints";
import { Typography } from "@mui/material";

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

export default function Orders() {
  const Order = useSelector((state) => state.Order);
  const id = Order.orderId;
  const [order, setOrder] = React.useState(null);
  console.log("orderId:", id);
  console.log("orderId:", Order);

  // useEffect(() => {
  //   // dispatch(getOrder(id));
  // }, []);

  useEffect(() => {
    setOrder(Order.data);
  }, [Order]);

  useEffect(() => {
    if (id && id !== "") {
      const ep = { ...orderEnd.getOne };
      apiBase({
        apiDetails: ep,
        path: { id: Order.orderId },
      }).then((response) => {
        setOrder(response.data);
      });
      console.log("orderDetails::", id);
    }
  }, [id]);

  return (
    <Box sx={{ padding: "0 50px" }}>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableRow>
                <StyledTableCell component="th" scope="row">
                  Order Id
                </StyledTableCell>
                <StyledTableCell align="right">{id}</StyledTableCell>
              </StyledTableRow>
            </TableRow>
            <TableRow>
              <StyledTableCell align="right">ProductId</StyledTableCell>
              <StyledTableCell align="right">product quantity</StyledTableCell>
              <StyledTableCell align="right">location type</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {order !== null ? (
              order?.products?.map((product) => {
                return (
                  <>
                    <StyledTableRow>
                      <StyledTableCell align="right">
                        {product?.id}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {product?.quantity}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {order?.shipment?.location_type}
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
            <StyledTableRow>
              <StyledTableCell align="right">Total Cost</StyledTableCell>
              <StyledTableCell align="right">
                {order?.total_cost}
              </StyledTableCell>
            </StyledTableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <Box>
        <Typography padding={"20px"}>
          Thank you!! Your order will arrive shortly.
        </Typography>
      </Box>
    </Box>
  );
}
