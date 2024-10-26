const express = require('express');
const router = express.Router();
router.get('/', (req, res) => {
    res.render('admin-layout', { title: 'Admin Home' });
});
router.get('/dashboard', (req, res) => {
    res.render('dashboard', { title: 'Admin Dashboard' });
});
router.get('/category', (req, res) => {
    res.render('category', { title: 'Quản lý category' });
});
router.get('/product', (req, res) => {
    res.render('product', { title: 'Quản lý product' });
});
router.get("/register", (req, res) => {
    res.render('register', { title: "Quản lí register" });
});
router.get('/login', (req, res) => {
    res.render('login');
  });  
module.exports = router;
