const express = require('express');
const { body } = require('express-validator');

const router = express.Router();
const adminController = require('../controllers/admin');
const isAuth = require('../middlewares/is-auth');

router.get('/admin/add-product', isAuth, adminController.getAddProduct);
router.get('/admin/products', isAuth, adminController.getAdminProductsPage);

router.post('/admin/add-product',
    [
        body('title').trim().isLength({ min: 3, max: 20 })
            .withMessage('title must be at least 3 characters long and not more than 20 characters'),
        body('imageUrl').trim().isURL().withMessage('Please enter valid url'),
        body('price').isFloat(),
        body('description').trim()
    ],
    isAuth, adminController.postAddProduct
);

router.get('/product/edit/:productId', isAuth, adminController.getEditPage);
router.post('/product/update-product/:productId',
    [
        body('title').trim().isLength({ min: 3, max: 20 })
            .withMessage('title must be at least 3 characters long and not more than 20 characters'),
        body('imageUrl').trim().isURL().withMessage('Please enter valid url'),
        body('price').isFloat(),
        body('description').trim().isLength({ max: 450 })
    ],
    isAuth, adminController.updateProduct
);
router.get('/product/delete/:productId', isAuth, adminController.deleteProduct);

module.exports = router;