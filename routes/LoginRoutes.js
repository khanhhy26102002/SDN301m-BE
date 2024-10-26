const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const router = express.Router();
const Login = require("../models/login");
const secretKey = "khanhhy";
router.post("/register", async (req, res) => {
  console.log("Register request received", req.body);
  const { username, email, password, confirmpassword } = req.body;

  if (password !== confirmpassword) {
    return res.status(400).json({ message: "Passwords do not match" });
  } else {
    try {
      const existingAccount = await Login.findOne({ username });
      if (existingAccount) {
        return res.status(400).json({ message: "Username already exists" });
      }
      const existingEmail = await Login.findOne({ email });
      if (existingEmail) {
        return res.status(400).json({ message: "Email already in use" });
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      console.log("Mật khẩu mã hóa:", hashedPassword);
      const newAccount = new Login({ username, email, password: hashedPassword });
      await newAccount.save();
      res.redirect('/admin/login');
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }
});
// router.post("/login", async (req, res) => {
//   const { username, password } = req.body;
//   console.log("Login request received", req.body);
//   try {
//     const account = await Login.findOne({ username });
//     console.log(account.password);
//     if (!account) {
//       return res.status(400).json({ message: "Invalid username or password" });
//     }
//     const isPasswordValid = await bcrypt.compare(password, account.password);
//     console.log("Password nhập vào:", password);
//     console.log("Password trong DB:", account.password);
//     console.log("Kết quả so sánh mật khẩu:", isPasswordValid);
//     if (!isPasswordValid) {
//       return res.status(400).json({ message: "Invalid username or password" });
//     }
//     const token = jwt.sign({ id: account._id }, secretKey, { expiresIn: "1h" });
//     console.log("Token tạo ra:", token);
//     res.status(200).json({ token });
//   } catch (error) {
//     console.error("Error during login", error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// })
router.post("/", async (req, res) => {
  const { username, password } = req.body;
  console.log("Login request received", req.body);
  try {
    const account = await Login.findOne({ username });
    if (!account) {
      return res.status(400).json({ message: "Invalid username or password" });
    }
    const isPasswordValid = await bcrypt.compare(password, account.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid username or password" });
    }

    const token = jwt.sign({ id: account._id }, secretKey, { expiresIn: "1h" });
    res.status(200).json({ token });
  } catch (error) {
    console.error("Error during login", error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;


