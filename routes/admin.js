const express = require('express');

const router = express.Router();

const path = require('path');
const rootDir = require('../util/app');

router.get('/admin/add-product', (req, res, next) => {
    res.sendFile(path.join(rootDir, 'views', 'add-product.html'));
})
 
 router.post('/admin/add-product', (req, res, next) => {
     console.log(req.body);
     res.redirect('/');
 })

 module.exports = router;