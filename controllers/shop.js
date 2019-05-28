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
    let newQuantity = 1;

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
            if (products.length > 0) {
                product = products[0];
            }
            if (product) {
                const oldQuantity = parseInt(product.cartItem.quantity);
                newQuantity += oldQuantity;
                return product;
            }
            return Product.findByPk(productId)
        })
        .then(product => {
            return fetchedCart.addProduct(product, {
                through: { quantity: newQuantity }
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

exports.deleteCart = (req, res, next) => {
    const user = req.user;
    const productId = req.body.productId;

    user.getCart()
        .then(cart => {
            return cart.getProducts({ where: { id: productId } })
        })
        .then(products => {
            product = products[0];
            return product.cartItem.destroy();
        })
        .then(() => {
            res.redirect('/shop/cart');
        })
        .catch(error => console.log(error));
}

exports.postOrder = (req, res, next) => {
    const user = req.user;
    let fetchedCart;
    user.getCart()
        .then(cart => {
            fetchedCart = cart;
            return cart.getProducts();
        })
        .then(products => {
            return user.createOrder()
                .then(order => {
                    return order.addProducts(products.map(product => {
                        product.orderItem = { quantity: product.cartItem.quantity };
                        console.log(product);
                        return product;
                    }))
                })
                .catch(error => console.log(error));
        })
        .then(() => {
            return fetchedCart.setProducts(null);
        })
        .then(result => {
            res.redirect('/shop');
        })
        .catch(error => console.log(error));
}

exports.getProductsPage = (req, res, next) => {
    res.render('shop/products', { pageTitle: 'Products', path: 'shop/products' });
}

exports.getOrdersPage = (req, res, next) => {
    req.user.getOrders({include: ['products']})
    .then(orders => {
        res.render('shop/orders', { pageTitle: 'Orders', path: '/orders', orders: orders });
    })
    .catch(error => console.log(error));
}