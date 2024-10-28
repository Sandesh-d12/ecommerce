import React from "react";
import { Button } from "@mui/material";
import { Box } from "@mui/system";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { apiBase } from "../../Api/config/config";
import { orderEnd } from "../../Api/config/apiendpoints";
export default function View() {
  //   const order = useSelector((state) => state.Order);
  const [order, setOrder] = useState({});

  const { id } = useParams();
  console.log(id);
  const navigate = useNavigate();
  useEffect(() => {
    apiBase({ apiDetails: orderEnd.getOne, path: { id: id } }).then((ord) => {
      setOrder(ord.data);
      console.log(ord);
    });
  }, []);
  console.log(order);

  return (
    <>
      {/* {order?.orders?.map((all) => { */}
      <Box
        sx={{
          display: "flex",
          padding: "50px",
          gap: "50px",
          justifyContent: "center",
          alignItmes: "center",
        }}
      >
        <Box>
          <Button variant="contained" href={`/update/${order._id}`}>
            Update Product
          </Button>
        </Box>

        {/* })} */}
        <Box>
          <Button
            variant="contained"
            href={`/updateAddress/${order._id}`}
            //  onClick={handleProduct}
          >
            Update Address
          </Button>
        </Box>
        <Box>
          <Button
            variant="contained"
            //  onClick={handleProduct}
          >
            Update Payment Method
          </Button>
        </Box>
      </Box>
    </>
  );
}
