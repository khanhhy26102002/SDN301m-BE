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
// router.get("/:id", authMiddleware, async (req, res) => {
//   const { id } = req.params;
//   const categories = await category.findById(id);
//   res.status(200).json({ categories });
// })
// router.put('/:id', authMiddleware, async (req, res) => {
//   const { id } = req.params;
//   const { name } = req.body;
//   try {
//     await category.findByIdAndUpdate(id, { name });
//     res.status(200).json({ message: 'Category updated successfully' });
//   } catch (error) {
//     console.error("Error updating category:", error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
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
const express = require('express');
const router = express.Router();
const Category = require('../models/Category');

// Lấy tất cả Category
router.get('/', async (req, res) => {
  try {
      const categories = await Category.find();
      res.render('category', { categories });
  } catch (error) {
      console.error("Error fetching categories: ", error);
      res.status(500).send("Error fetching categories.");
  }
});

// Tạo mới Category
router.post('/create', async (req, res) => {
    const newCategory = new Category(req.body);
    await newCategory.save();
    res.redirect('/api/category');
});

// Cập nhật Category
router.post('/update/:id', async (req, res) => {
    const { id } = req.params;
    await Category.findByIdAndUpdate(id, req.body);
    res.redirect('/api/category');
});

// Xóa Category
router.post('/delete/:id', async (req, res) => {
    const { id } = req.params;
    await Category.findByIdAndDelete(id);
    res.redirect('/api/category');
});

module.exports = router;
