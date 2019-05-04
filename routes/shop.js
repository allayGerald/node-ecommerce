const express = require('express');

const router = express.Router();

const path = require('path');
const rootDir = require('../util/app');

const adminData = require('./admin');

router.get('/', (req, res, next) => {
    console.log(adminData.products);
    res.render('shop');
});

module.exports = router;