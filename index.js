const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const category = require("./routes/CategoryRoutes");
const product = require("./routes/ProductRoutes");
const app = express();
app.use(bodyParser.json());
const url = "mongodb://localhost:27017/Category"
const connect = mongoose.connect(url);
connect.then((db) => {
  console.log("Connected correctly to server");
})
app.use("/api/categories", category);
app.use("/api/products", product);
const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
})