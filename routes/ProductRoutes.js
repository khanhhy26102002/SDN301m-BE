// const express = require('express');
// const authMiddleware = require('../middlewares/authMiddleware');
// const Product = require("../models/product");
// const router = express.Router();
// router.post('/', authMiddleware, async (req, res) => {
//   const { name, category, price } = req.body;
//   try {

//     if (!category || !price) {
//       return res.status(400).json({ message: "Category and price are required" });
//     }

//     const newProduct = new Product({ name, category, price });
//     await newProduct.save();
//     res.status(201).json({ message: 'Product created successfully', product: newProduct });
//   } catch (error) {
//     console.error("Error creating product:", error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// });


// router.get('/', authMiddleware, async (req, res) => {
//   try {
//     const products = await Product.find();
//     res.status(200).json({ products });
//   } catch (error) {
//     console.error("Error fetching products:", error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// });


// router.put('/:id', authMiddleware, async (req, res) => {
//   const { id } = req.params;
//   const { name, category, price } = req.body;

//   try {

//     const updatedProduct = await Product.findByIdAndUpdate(id, { name, category, price }, { new: true });
//     if (!updatedProduct) {
//       return res.status(404).json({ message: 'Product not found' });
//     }
//     res.status(200).json({ message: 'Product updated successfully', product: updatedProduct });
//   } catch (error) {
//     console.error("Error updating product:", error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// });


// router.delete('/:id', authMiddleware, async (req, res) => {
//   const { id } = req.params;
//   try {
//     const deletedProduct = await Product.findByIdAndDelete(id);
//     if (!deletedProduct) {
//       return res.status(404).json({ message: 'Product not found' });
//     }
//     res.status(200).json({ message: 'Product deleted successfully' });
//   } catch (error) {
//     console.error("Error deleting product:", error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// });

// module.exports = router;
// routes/ProductRoutes.js
const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const Category = require('../models/Category');
const product = require('../models/Product');
router.get('/', async (req, res) => {
    try {
        const categories = await Category.find();
        const products = await Product.find().populate('category');
        res.render('product', { products, categories });
    } catch (error) {
        console.error('Error fetching products: ', error);
        res.status(500).send('Error fetching products.');
    }
});
router.post('/create', async (req, res) => {
    try {
        console.log(req.body);
        const { name, description, price, category } = req.body;
        const newProduct = new Product({
            name,
            description,
            price,
            category
        });
        await newProduct.save();
        res.redirect('/api/product');
    } catch (error) {
        console.error('Error creating product:', error);
        res.status(500).send('Error creating product.');
    }
});
router.post('/update/:id', async (req, res) => {
    try {
        const { id } = req.params;
        console.log(req.body);
        await Product.findByIdAndUpdate(id, req.body);

        res.redirect('/api/product');
    } catch (error) {
        console.error('Error updating product: ', error);
        res.status(500).send('Error updating product.');
    }
});
router.post('/delete/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await Product.findByIdAndDelete(id);
        res.redirect('/api/product');
    } catch (error) {
        console.error('Error deleting product: ', error);
        res.status(500).send('Error deleting product.');
    }
});

module.exports = router;
