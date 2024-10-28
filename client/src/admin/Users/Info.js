import React from "react";
import { Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

export default function Info() {
  const User = useSelector((state) => state.user);
  console.log(User);
  return <Typography>Welcome {User.firstName}</Typography>;
}
