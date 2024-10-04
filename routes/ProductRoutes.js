const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();
router.post('/', authMiddleware, (req, res) => {
  res.status(201).json({ message: 'Product created successfully' });
});
router.get('/', authMiddleware, (req, res) => {
  res.status(200).json({ categories: [] });
});
router.put('/:id', authMiddleware, (req, res) => {
  res.status(200).json({ message: 'Product updated successfully' });
});
router.delete('/:id', authMiddleware, (req, res) => {
  res.status(200).json({ message: 'Product deleted successfully' });
});

module.exports = router;
