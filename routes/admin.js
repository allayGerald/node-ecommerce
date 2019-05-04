const express = require('express');

const router = express.Router();

const path = require('path');
const rootDir = require('../util/app');

const products = [];
router.get('/admin/add-product', (req, res, next) => {
    res.sendFile(path.join(rootDir, 'views', 'add-product.html'));
})
 
 router.post('/admin/add-product', (req, res, next) => {
     products.push({tittle: req.body.title});
     res.redirect('/');
 })

 exports.routes = router;
 exports.products = products;