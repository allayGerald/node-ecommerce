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
    Product.findByPk(prodId)
        .then(product => {
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

exports.postCart = (req, res, next) => {
    const user = req.user;
    const productId = req.body.productId;
    let fetchedCart;

    user.getCart()
        .then(cart => {
            fetchedCart = cart;
            return cart.getProducts({
                where: {
                    id: productId
                }
            })
        })
        .then(products => {
            let product;
            let newQuantity = 1;
            if (products.length > 0) {
                product = products[0];
            }
            if (product) {

            }
            return Product.findByPk(productId)
                .then(product => {
                    return fetchedCart.addProduct(product, {
                        through: { quantity: newQuantity }
                    })
                })
        })
        .then(products => {
            res.redirect('/shop/cart');
        })
        .catch(error => console.log(error));
}

exports.getCartPage = (req, res, next) => {
    req.user.getCart()
        .then(cart => {
            return cart.getProducts();

        })
        .then(products => {
            res.render('shop/cart', {
                pageTitle: 'Cart', products: products,
                path: 'shop/cart'
            });
        })
        .catch(error => console.log(error));
}

exports.getProductsPage = (req, res, next) => {
    res.render('shop/products', { pageTitle: 'Products', path: 'shop/products' });
}