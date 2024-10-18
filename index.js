// const express = require("express");
// const mongoose = require("mongoose");
// const bodyParser = require("body-parser");
// const category = require("./routes/CategoryRoutes");
// const product = require("./routes/ProductRoutes");
// const login = require("./routes/LoginRoutes");
// const app = express();
// const cors = require("cors");
// app.use(cors());
// app.use(bodyParser.json());
// const url = "mongodb://localhost:27017/Category"
// const connect = mongoose.connect(url);
// connect.then((db) => {
//   console.log("Connected correctly to server");
// });
// app.use("/api/category", category);
// app.use("/api/product", product);
// app.use("/api/login", login);
// const port = process.env.PORT || 3000;
// app.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
// })
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const category = require("./routes/CategoryRoutes");
const product = require("./routes/ProductRoutes");
const login = require("./routes/LoginRoutes");
const app = express();
app.set('view engine', 'ejs');
app.set('views', './views');
app.use(cors());
app.use(cors({
    origin: 'http://localhost:3000', // Your front-end URL
    allowedHeaders: ['Authorization', 'Content-Type'] // Allow Authorization and other headers
}));
app.use(express.json());
const url = "mongodb://localhost:27017/Category";
mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log("Connected correctly to server");
}).catch((err) => {
  console.error("Error connecting to MongoDB:", err);
});
app.use("/api/category", category);
app.use("/api/product", product);
app.use("/api/login", login);
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
