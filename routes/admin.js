const express = require('express');

const router = express.Router();

const path = require('path');
const rootDir = require('../util/app');

const products = [];
router.get('/admin/add-product', (req, res, next) => {
    res.render('add-product', {pageTitle: 'Add Product'});
})
 
 router.post('/admin/add-product', (req, res, next) => {
     products.push({title: req.body.title});
     res.redirect('/');
 })

 exports.routes = router;
 exports.products = products;