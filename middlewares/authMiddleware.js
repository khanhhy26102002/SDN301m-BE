const jwt = require("jsonwebtoken");
const secretKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2NvdW50SWQiOiI2NmZmOWQzYjA1MGQwZTY4YTc2NDU1ZDkiLCJpYXQiOjE3MjgwMzM4MzUsImV4cCI6MTcyODAzNzQzNX0.qN_iqhIvPxmtkKGHrtErSI-uXC9bKl20TatyB0Gqqes"; // Đảm bảo rằng secretKey khớp với trong mã tạo token

const authMiddleware = (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");
  
  console.log("Token nhận được từ header:", token);

  if (!token) {
    return res.status(401).json({ message: "Access denied, no token provided" });
  }
  
  try {
    const decoded = jwt.verify(token, secretKey);
    req.user = decoded;
    console.log("Token hợp lệ, user:", req.user);
    next();
  } catch (error) {
    return res.status(400).json({ message: "Invalid token" });
  }
};

module.exports = authMiddleware;
