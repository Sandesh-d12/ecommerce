// import React from "react";
// import { useSelector } from "react-redux";
// import { Box } from "@mui/system";
// import { useMemo } from "react";
// import { useTable } from "react-table";
// import { COLUMNS } from './styles/orderInfo.styles'
// import "./styles/table.css";

// export default function OrderInfo() {
//   const order = useSelector((state) => state.Order);
//   const User = useSelector((state) => state.user);
//   console.log(User);
//   console.log(order);

// //   const COLUMNS = [
// //     {
// //       Header: "Id",
// //       accesor: User.id,
// //     },
// //     {
// //       Header: "First Name",
// //       accesor: User.firstName,
// //     },
// //     {
// //       Header: "Last Name",
// //       accesor: User.lastName,
// //     },
// //     {
// //       Header: "Address",
// //       accesor: User.address,
// //     },
// //   ];
//   const columns = useMemo(() => COLUMNS, []);
//   const data = useMemo(() => User, []);
//   console.log(data);
//   const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
//     useTable({
//       columns,
//       data,
//     });
//   return (

//       <table {...getTableProps()}>
//         <thead>
//           {headerGroups.map((headerGroup) => (
//             <tr {...headerGroup.getHeaderGroupProps()}>
//               {headerGroup.headers.map((column) => (
//                 <th {...column.getHeaderProps()}>{column.render("Header")}</th>
//               ))}
//             </tr>
//           ))}
//         </thead>
//         <tbody {...getTableBodyProps()}>
//           {rows.map((row) => {
//             prepareRow(row);
//             return (
//               <tr {...row.getRowProps()}>
//                 {row.cells.map((cell) => {
//                   return (
//                     <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
//                   );
//                 })}
//               </tr>
//             );
//           })}
//         </tbody>
//       </table>

//   );
// }

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
export default function OderInfo() {
  const order = useSelector((state) => state.Order);
  const User = useSelector((state) => state.user);
  console.log(order);
  console.log(User);

  return (
    <Box sx={{ padding: "0 50px" }}>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <Typography textAlign={"center"}>Order Details::=</Typography>
            <TableRow>
              <StyledTableCell align="right">ProductId</StyledTableCell>
              <StyledTableCell align="right">product quantity</StyledTableCell>
              <StyledTableCell align="right">location type</StyledTableCell>
              <StyledTableCell align="right">Country</StyledTableCell>
              <StyledTableCell align="right">District</StyledTableCell>
              <StyledTableCell align="right">House Number</StyledTableCell>
              <StyledTableCell align="right">Shipment Status</StyledTableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {order !== null ? (
              order?.getOrder?.data?.products?.map((product) => {
                return (
                  <>
                    <StyledTableRow>
                      <StyledTableCell align="right">
                        {product.id}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {product.quantity}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {order?.data?.shipment?.location_type}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {order?.getOrder?.data?.shipment?.address?.country}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {order?.getOrder?.data?.shipment?.address?.district}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {order?.getOrder?.data?.shipment?.address?.house_number}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {order?.getOrder?.data?.shipment?.status}
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
                {order?.getOrder?.data?.total_cost}
              </StyledTableCell>
            </StyledTableRow>
          </TableBody>
          <TableHead>
            <Typography textAlign={"center"}>Customer Details::=</Typography>
            <TableRow>
              <StyledTableCell align="right">User Id</StyledTableCell>
              <StyledTableCell align="right">First Name</StyledTableCell>
              <StyledTableCell align="right">Last Name</StyledTableCell>
              <StyledTableCell align="right">Address</StyledTableCell>
              <StyledTableCell align="right">Email Id</StyledTableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            <StyledTableRow>
              <StyledTableCell align="right">{User.id}</StyledTableCell>
              <StyledTableCell align="right">{User.firstName}</StyledTableCell>
              <StyledTableCell align="right">{User.lastName}</StyledTableCell>
              <StyledTableCell align="right">{User.address}</StyledTableCell>
              <StyledTableCell align="right">{User.email}</StyledTableCell>
            </StyledTableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
