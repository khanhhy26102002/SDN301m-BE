const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const category = require("../models/category");
const router = express.Router();
router.post('/', authMiddleware, async (req, res) => {
  const { name } = req.body;
  try {
    const newCategory = new category({ name });
    await newCategory.save();
    res.status(201).json({ message: 'Category created successfully', category: newCategory });
  } catch (error) {
    console.error("Error creating category:", error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/', authMiddleware, async (req, res) => {
  const categories = await category.find();
  res.status(200).json({ categories });
});
router.put('/:id', authMiddleware, async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  try {
    await category.findByIdAndUpdate(id, { name });
    res.status(200).json({ message: 'Category updated successfully' });
  } catch (error) {

  }

});
router.delete('/:id', authMiddleware, async (req, res) => {
  const { id } = req.params;
  try {
    await category.findByIdAndDelete(id);
    res.status(200).json({ message: 'Category deleted successfully' });
  } catch (error) {
    console.error("Error deleting category:", error);
    res.status(500).json({ error: 'Internal server error' });
  }

});

module.exports = router;
