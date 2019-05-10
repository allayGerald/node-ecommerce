const express = require('express');

const router = express.Router();
const productsController = require('../controllers/products');

router.get('/admin/add-product', productsController.getAddProduct);
router.get('/admin/products', productsController.getAdminProductsPage);

router.post('/admin/add-product', productsController.postAddProduct);

module.exports = router;