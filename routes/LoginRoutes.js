const express = require("express");
const router = express.Router();
const Login = require("../models/login");
router.post("/", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await Login.findOne({ name: username });
    if (!user || user.password !== password) {
      return res.status(400).json({ message: "Invalid username or password" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
module.exports = router;


