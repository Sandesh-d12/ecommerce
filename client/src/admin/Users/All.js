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
import { getAll } from "../../reducers/userSlice";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Box } from "@mui/system";
import { Button, Typography } from "@mui/material";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  padding: "30px",
  [`&.${tableCellClasses.head}`]: {},
  [`&.${tableCellClasses.body}`]: {
    fontSize: 20,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {},
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function All() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const User = useSelector((state) => state.user);

  // const [ser, setUser] = React.useState(0);

  useEffect(() => {
    dispatch(getAll());
    console.log(User.getAll);
    console.log("user");
  }, []);

  // useEffect(() => {
  //   // setUser(User?.getAll);
  // }, []);

  return (
    <Box sx={{ padding: "0 50px" }}>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableRow>
                <StyledTableCell component="th" scope="row" paddingRight="30px">
                  USER ID
                </StyledTableCell>
              </StyledTableRow>
              <StyledTableCell component="th" scope="row">
                First Name
              </StyledTableCell>
              <StyledTableCell component="th" scope="row">
                Last Name
              </StyledTableCell>
              <StyledTableCell component="th" scope="row">
                Email
              </StyledTableCell>
              <StyledTableCell component="th" scope="row">
                Role
              </StyledTableCell>
              <StyledTableCell component="th" scope="row">
                Address
              </StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {User?.getAll !== null ? (
              User?.getAll?.map((users) => {
                return (
                  <>
                    <StyledTableRow>
                      <StyledTableCell align="right">
                        {users._id}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {users.firstName}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {users.lastName}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {users.email}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {users.role}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {users.address}
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
    </Box>
  );
}
