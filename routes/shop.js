const express = require('express');

const router = express.Router();

const productsController = require('../controllers/products');

router.get('/', productsController.getShopPage);
router.get('/shop/cart', productsController.getCartPage);
router.get('/shop/products', productsController.getProductsPage);

module.exports = router;