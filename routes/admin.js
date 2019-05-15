const express = require('express');

const router = express.Router();
const adminController = require('../controllers/admin');

router.get('/admin/add-product', adminController.getAddProduct);
router.get('/admin/products', adminController.getAdminProductsPage);

router.post('/admin/add-product', adminController.postAddProduct);

module.exports = router;