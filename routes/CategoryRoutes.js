// const express = require('express');
// const authMiddleware = require('../middlewares/authMiddleware');
// const category = require("../models/category");
// const router = express.Router();
// router.post('/', authMiddleware, async (req, res) => {
//   const { name, description } = req.body;
//   try {
//     const newCategory = new category({ name, description });
//     await newCategory.save();
//     res.status(201).json({ message: 'Category created successfully', category: newCategory });
//   } catch (error) {
//     console.error("Error creating category:", error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// });

// router.get('/', authMiddleware, async (req, res) => {
//   const categories = await category.find();
//   res.status(200).json({ categories });
// });
// router.put('/:id', authMiddleware, async (req, res) => {
//   const { id } = req.params;
//   const { name } = req.body;
//   const { description } = req.body;
//   try {
//     await category.findByIdAndUpdate(id, { name }, { description });
//     res.status(200).json({ message: 'Category updated successfully' });
//   } catch (error) {

//   }

// });
// router.get('/:id', authMiddleware, async (req, res) => {
//   const { id } = req.params;
//   const categories = await category.findById(id);
//   res.status(200).json({ categories });
// });
// router.delete('/:id', authMiddleware, async (req, res) => {
//   const { id } = req.params;
//   try {
//     await category.findByIdAndDelete(id);
//     res.status(200).json({ message: 'Category deleted successfully' });
//   } catch (error) {
//     console.error("Error deleting category:", error);
//     res.status(500).json({ error: 'Internal server error' });
//   }

// });

// module.exports = router;
const express = require("express");
const router = express.Router();
const Category = require("../models/Category");
const authMiddleware = require("../middlewares/authMiddleware");
router.get("/", async (req, res) => {
  try {
    const categories = await Category.find();
    res.render('categoryList', { categories });
  } catch (error) {
    res.status(500).json({ message: "Error fetching categories" });
  }
});
router.get("/create", (req, res) => {
  res.render('categoryCreate');
});

router.post("/", authMiddleware, async (req, res) => {
  const { name, description } = req.body;
  try {
    const newCategory = new Category({ name, description });
    await newCategory.save();
    res.redirect('/api/category');
  } catch (error) {
    res.status(500).json({ message: "Error creating category" });
  }
});

module.exports = router;
