const express = require('express');

const router = express.Router();
const productsController = require('../controllers/products');

router.get('/admin/add-product', productsController.getAddProduct);

router.post('/admin/add-product', productsController.postAddProduct);

module.exports = router;