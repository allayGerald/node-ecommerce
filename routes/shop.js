const express = require('express');

const router = express.Router();

const shopController = require('../controllers/shop');

router.get('/', shopController.getShopPage);

router.get('/shop/cart', isAuth, shopController.getCartPage);

router.post('/shop/cart', isAuth, shopController.postCart);

router.post('/cart/delete-item', isAuth, shopController.deleteCart);

router.get('/shop/products', shopController.getProductsPage);

router.get('/products/details/:productId', shopController.getDetails);

router.post('/orders/create', isAuth, shopController.postOrder);

router.get('/orders', isAuth, shopController.getOrdersPage);

module.exports = router;