const Product = require('../models/product');

exports.getShopPage = (req, res, next) => {
    Product.fetchAll()
        .then(([rows, fieldData]) => {
            res.render('shop/product-list',
                { pageTitle: 'Shop', products: rows, path: '/shop' }
            );
        })
        .catch(err => console.log(err));
}

exports.getDetails = (req, res, next) => {
    const prodId = req.params.productId;
    Product.findById(prodId, product => {
        res.render('shop/product-details', {
            product: product,
            pageTitle: 'Product Details',
            path: '/shop'
        })
    });
}

exports.getCartPage = (req, res, next) => {
    res.render('shop/cart', { pageTitle: 'Cart', path: '/shop/cart' });
}

exports.getProductsPage = (req, res, next) => {
    res.render('shop/products', { pageTitle: 'Products', path: 'shop/products' });
}