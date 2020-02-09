const express = require("express");
const User = require("./model/User");
const cors = require("cors");
PORT = process.env.PORT || 8000;
require("./config/database");
const app = express();

app.use(express.json());
app.use(cors());

//router
const router = require("./router");

app.use("/api", router);

app.listen(PORT, () => {
  console.log("You app is running port " + PORT);
});
