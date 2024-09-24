const express = require("express");
const router = express.Router();
const Product = require("../models/product");
router.post("/", async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();
    res.status(201).json(product);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
})
router.get("/", async (req, res) => {
  try {
    const product = await Product.find();
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
router.get("/:id", async (req, res) => {
  try {
    const productId = await Product.findById(req.params.id);
    if (productId === null) {
      res.status(404).json({ message: "ProductId not found" });
    }
    res.json(productId);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
})
router.put("/:id", async (req, res) => {
  try {
    const productId = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!productId) {
      res.status(404).json({ message: "ProductId not found " });
    }
    res.json(productId);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
router.delete("/:id", async (req, res) => {
  try {
    const productId = await Product.findByIdAndDelete(req.params.id);
    if (productId === null) {
      res.status(404).json({ message: "ProductId not found" });
    }
    res.json({ message: "Product Deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
})
module.exports = router;