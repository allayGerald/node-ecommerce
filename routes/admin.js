const express = require('express');

const router = express.Router();
const adminController = require('../controllers/admin');

router.get('/admin/add-product', adminController.getAddProduct);
router.get('/admin/products', adminController.getAdminProductsPage);

router.post('/admin/add-product', adminController.postAddProduct);

router.get('/product/edit/:productId', adminController.getEditPage);
router.post('/product/update-product/:productId', adminController.updateProduct);
router.get('/product/delete/:productId', adminController.deleteProduct);

module.exports = router;