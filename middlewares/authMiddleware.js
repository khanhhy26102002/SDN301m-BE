// const jwt = require("jsonwebtoken");
// const secretKey = "khanhhy";

// const authMiddleware = (req, res, next) => {
//   const token = req.header("Authorization")?.replace("Bearer ", "");
//   console.log("Authorization header:", req.header("Authorization"));
//   console.log("Token nhận được từ header:", token);

//   if (!token) {
//     return res.status(401).json({ message: "Access denied, no token provided" });
//   }

//   try {
//     const decoded = jwt.verify(token, secretKey);
//     req.user = decoded;
//     console.log("Token hợp lệ, user:", req.user);
//     next();
//   } catch (error) {
//     console.error("Token verification failed:", error.message);
//     return res.status(400).json({ message: "Invalid token" });
//   }
// };

// module.exports = authMiddleware;
require('dotenv').config(); // Load environment variables

const jwt = require("jsonwebtoken");
const secretKey = process.env.SECRET_KEY; // Use the secret from environment variable

const authMiddleware = (req, res, next) => {
    const token = req.header("Authorization")?.replace("Bearer ", "");
    console.log("Authorization header:", req.header("Authorization"));
    console.log("Token nhận được từ header:", token);
    console.log("Request Headers:", req.headers);
    if (!token) {
        return res.status(401).json({ message: "Access denied, no token provided" });
    }

    try {
        const decoded = jwt.verify(token, secretKey);
        req.user = decoded;
        console.log("Token hợp lệ, user:", req.user);
        next();
    } catch (error) {
        console.error("Token verification failed:", error.message);
        return res.status(400).json({ message: "Invalid token" });
    }
};

module.exports = authMiddleware;
