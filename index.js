const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const category = require("./routes/CategoryRoutes");
const product = require("./routes/ProductRoutes");
const login = require("./routes/LoginRoutes");
const cors = require("cors");
const app = express();
app.use(express.json());
const url = "mongodb://localhost:27017/Category"
const connect = mongoose.connect(url);
connect.then((db) => {
  console.log("Connected correctly to server");
});
app.use(cors());
app.use("/api/categories", category);
app.use("/api/products", product);
app.use("/api/login", login);
const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
})