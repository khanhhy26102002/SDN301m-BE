const express = require("express");
const mongoose = require("mongoose");
const category = require("./routes/CategoryRoutes");
const product = require("./routes/ProductRoutes");
const login = require("./routes/LoginRoutes");
const adminRoutes = require("./routes/admin");
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const cors = require("cors");
app.use(cors());
app.set("view engine", "ejs");
app.set("views", "./views");
const url = "mongodb://localhost:27017/Category"
const connect = mongoose.connect(url, {
  useNewUrlParser: true, useUnifiedTopology: true
});
connect.then((db) => {
  console.log("Connected correctly to server");
});
app.use("/api/category", category);
app.use("/api/product", product);
app.use("/api/login", login);
app.use("/admin", adminRoutes);
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
})