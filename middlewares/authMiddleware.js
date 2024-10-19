const jwt = require("jsonwebtoken");
const secretKey = "khanhhy";

const authMiddleware = (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");
  console.log("Authorization header:", req.header("Authorization"));
  console.log("Token extracted from header:", token); // Log token for debugging
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
// require('dotenv').config(); // Load environment variables
// const jwt = require("jsonwebtoken");
// const secretKey = process.env.SECRET_KEY; // Use the secret from environment variable

// const authMiddleware = (req, res, next) => {
//     const token = req.header("Authorization")?.replace("Bearer ", "");
    
//     console.log("Authorization header:", req.header("Authorization")); // Log header for debugging
//     console.log("Token extracted from header:", token); // Log token for debugging
//     console.log("Request Headers:", req.headers); // Log all headers for debugging

//     if (!token) {
//         return res.status(401).json({ message: "Access denied, no token provided" });
//     }

//     try {
//         const decoded = jwt.verify(token, secretKey);
//         req.user = decoded;
//         console.log("Valid token, user:", req.user); // Log user details after verification
//         next(); // Token is valid, proceed to the next middleware
//     } catch (error) {
//         console.error("Token verification failed:", error.message);
//         return res.status(400).json({ message: "Invalid token" });
//     }
// };

// module.exports = authMiddleware;

