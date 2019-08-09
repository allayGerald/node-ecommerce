const express = require('express');

const router = express.Router();
const adminController = require('../controllers/admin');
const isAuth = require('../middlewares/is-auth');

router.get('/admin/add-product', isAuth, adminController.getAddProduct);
router.get('/admin/products', isAuth, adminController.getAdminProductsPage);

router.post('/admin/add-product', isAuth, adminController.postAddProduct);

router.get('/product/edit/:productId', isAuth, adminController.getEditPage);
router.post('/product/update-product/:productId', isAuth, adminController.updateProduct);
router.get('/product/delete/:productId', isAuth, adminController.deleteProduct);

module.exports = router;