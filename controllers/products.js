const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
    res.render('admin/add-product',
        { pageTitle: 'Add Product', path: 'admin/add-product' }
    );
}

exports.postAddProduct = (req, res, next) => {
    const product = new Product(req.body);
    product.save();
    res.redirect('/');
}

exports.getShopPage = (req, res, next) => {
    Product.fetchAll((products) => {
        res.render('shop/product-list',
            { pageTitle: 'Shop', products: products, path: '/shop' }
        );
    });
}

exports.getCartPage = (req, res, next) => {
    res.render('shop/cart', {pageTitle: 'Cart', path:'/shop/cart'});
}

exports.getProductsPage = (req, res, next) => {
    res.render('shop/products', {pageTitle: 'Cart', path:'shop/products'});
}

exports.getAdminProductsPage = (req, res, next) => {
    res.render('admin/products', {pageTitle: 'Admin Products', path: 'admin/products'});
}