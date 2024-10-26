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
router.get('/categories', async (req, res) => {
  try {
    const categories = await Category.find();
    res.render('category', { categories });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
router.post('/categories/create', async (req, res) => {
  const { name, description } = req.body;
  try {
    const newCategory = new Category({ name, description });
    await newCategory.save();
    res.redirect('/api/category/categories');
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
router.get('/categories/create', (req, res) => {
  res.render('createCategory');
});
router.get("/category/editcategory", (req, res) => {
  res.render("editcategory");
})
router.post('/update/:id', async (req, res) => {
  const { name, description } = req.body;
  try {
      await Category.findByIdAndUpdate(req.params.id, { name, description });
      res.redirect('/api/category/categories'); // Redirect after updating
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
});
router.get('/update/:id', async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) {
      return res.status(404).send('Category not found');
    }
    res.render('editCategory', { category });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
router.post('/delete/:id', async (req, res) => {
  await Category.findByIdAndDelete(req.params.id);
  res.redirect('/api/category/categories');
});
router.get('/delete/:id', async (req, res) => {
  await Category.findByIdAndDelete(req.params.id);
  res.redirect('/api/category/categories');
});
module.exports = router;
