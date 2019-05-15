const express = require('express');

const router = express.Router();

const shopController = require('../controllers/shop');

router.get('/', shopController.getShopPage);

router.get('/shop/cart', shopController.getCartPage);

router.get('/shop/products', shopController.getProductsPage);

router.get('/products/details/:productId', shopController.getDetails);

module.exports = router;