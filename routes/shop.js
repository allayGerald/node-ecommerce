const express = require('express');

const router = express.Router();

const path = require('path');
const rootDir = require('../util/app');

const adminData = require('./admin');

router.get('/', (req, res, next) => {
    const products = adminData.products;
    res.render('shop', {pageTitle: 'Shop', products: products, path: '/shop'});
});

module.exports = router;