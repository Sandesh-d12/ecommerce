const express = require("express");
const bodyParser = require("body-parser");
const { response } = require("express");
const app = express();
const router = require("./routes/routes");
const cors = require("cors");
const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true, 
  optionSuccessStatus: 200,
};
app.use(cors()); 

const PORT = process.env.PORT || 5001;
app.use(express.json());
// app.use(express.urlencoded());
app.use("/api", router);

app.get("/", async (req, res) => {
  res.send("Hello API");
});

app.listen(PORT, (err) => {
  if (err) {
    return console.log("ERROR", err);
  } else {
    console.log("Server Started on port:" + PORT);
  }
});
