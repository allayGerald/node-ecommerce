const Product = require('../models/product');

exports.getShopPage = (req, res, next) => {
    Product.findAll()
        .then(products => {
            res.render('shop/product-list',
                { pageTitle: 'Shop', products: products, path: '/shop' }
            );
        })
        .catch(err => {
            console.log(err)
        });
}

exports.getDetails = (req, res, next) => {
    const prodId = req.params.productId;
    Product.findById(prodId)
        .then(([prod]) => {
            const product = prod[0];
            res.render('shop/product-details', {
                product: product,
                pageTitle: 'Product Details: ' + product.title,
                path: '/shop'
            });
        })
        .catch(error => {
            console.log(error);
        });
}

exports.getCartPage = (req, res, next) => {
    res.render('shop/cart', { pageTitle: 'Cart', path: '/shop/cart' });
}

exports.getProductsPage = (req, res, next) => {
    res.render('shop/products', { pageTitle: 'Products', path: 'shop/products' });
}