const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const Product = require("../models/product");
const router = express.Router();
router.post('/', authMiddleware, async (req, res) => {
  const { name, category, price } = req.body;
  try {

    if (!category || !price) {
      return res.status(400).json({ message: "Category and price are required" });
    }

    const newProduct = new Product({ name, category, price });
    await newProduct.save();
    res.status(201).json({ message: 'Product created successfully', product: newProduct });
  } catch (error) {
    console.error("Error creating product:", error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


router.get('/', authMiddleware, async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json({ products });
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


router.put('/:id', authMiddleware, async (req, res) => {
  const { id } = req.params;
  const { name, category, price } = req.body;

  try {

    const updatedProduct = await Product.findByIdAndUpdate(id, { name, category, price }, { new: true });
    if (!updatedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json({ message: 'Product updated successfully', product: updatedProduct });
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


router.delete('/:id', authMiddleware, async (req, res) => {
  const { id } = req.params;
  try {
    const deletedProduct = await Product.findByIdAndDelete(id);
    if (!deletedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
