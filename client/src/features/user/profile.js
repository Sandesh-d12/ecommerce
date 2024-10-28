import React from "react";
import { Typography } from "@mui/material";
import { useSelector } from "react-redux";

function Profile() {
  const { firstName } = useSelector((state) => state.user);
  console.log(firstName);

  return <Typography component="h1">Welcome {firstName}</Typography>;
}

export default Profile;
