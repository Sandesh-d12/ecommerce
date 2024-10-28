import React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useSelector } from "react-redux";
import { Box } from "@mui/system";
import { Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { orders } from "../../reducers/orderSlice";
import { useEffect, useState } from "react";

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

const edit = [
  { id: 1, title: "Product" },
  { id: 2, title: "Address" },
];

export default function AllOrder() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const User = useSelector((state) => state.user);
  const order = useSelector((state) => state.Order);
  useEffect(() => {
    console.log(order.orders);
    dispatch(orders());
  }, []);

  const [anchorEl1, setAnchorEl1] = useState(edit[0]);

  const handleClick = (event) => {
    setAnchorEl1(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl1(null);
  };
  const handleView = (orderId) => {
    navigate(`/view/${orderId}`);
  };

  return (
    <Box sx={{ padding: "0 50px" }}>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <Typography align={"center"}>All Order=</Typography>
            <TableRow>
              <StyledTableCell align="right">Order Id</StyledTableCell>
              <StyledTableCell align="right">user id</StyledTableCell>
              <StyledTableCell align="right">product id</StyledTableCell>
              <StyledTableCell align="right">product quantity</StyledTableCell>
              <StyledTableCell align="right">location type</StyledTableCell>
              <StyledTableCell align="right">Country</StyledTableCell>
              <StyledTableCell align="right">District</StyledTableCell>
              <StyledTableCell align="right">House Number</StyledTableCell>
              <StyledTableCell align="right">Shipment Status</StyledTableCell>
              <StyledTableCell align="right">Order Status</StyledTableCell>
              <StyledTableCell align="right"></StyledTableCell>
              <StyledTableCell align="right"></StyledTableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {order !== null ? (
              order?.orders?.map((all) => {
                return (
                  <>
                    <StyledTableRow>
                      <StyledTableCell align="right">
                        {all?._id}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {all?.user_id}
                      </StyledTableCell>
                      {all.products !== null ? (
                        all.products.map((product) => {
                          return (
                            <>
                              <StyledTableCell align="right">
                                {product?.id}
                              </StyledTableCell>
                              <StyledTableCell align="right">
                                {product?.quantity}
                              </StyledTableCell>
                            </>
                          );
                        })
                      ) : (
                        <StyledTableRow>
                          <StyledTableCell>no product found</StyledTableCell>
                        </StyledTableRow>
                      )}
                      <StyledTableCell align="right">
                        {all?.shipment?.location_type}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {all?.shipment?.address?.country}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {all?.shipment?.address?.district}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {all?.shipment?.address?.house_number}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {all?.shipment?.status}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {all?.status}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        <Button variant="contained" href="#">
                          Delete
                        </Button>
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        <Box>
                          <Button
                            variant="contained"
                            onClick={() => {
                              handleView(all._id);
                            }}
                          >
                            View
                          </Button>
                        </Box>
                      </StyledTableCell>
                    </StyledTableRow>
                  </>
                );
              })
            ) : (
              <StyledTableRow>
                <StyledTableCell>no order found</StyledTableCell>
              </StyledTableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
