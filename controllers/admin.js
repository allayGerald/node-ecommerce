const Product = require('../models/product');
const { validationResult } = require('express-validator');

exports.getAddProduct = (req, res, next) => {
    res.render('admin/add-product',
        {
            pageTitle: 'Add Product',
            path: 'admin/add-product',
            oldInputs: {},
            errors: null
        });
}

exports.postAddProduct = (req, res, next) => {
    const title = req.body.title;
    const imageUrl = req.body.imageUrl;
    const description = req.body.description;
    const price = req.body.price;
    const user = req.user;

    const errors = validationResult(req);
console.log(errors.array()[0]);
    if (!errors.isEmpty()) {
        return res.status(422).render('admin/add-product',
            {
                pageTitle: 'Add Product',
                path: 'admin/add-product',
                oldInputs: {
                    title, imageUrl, description, price, user
                },
                errors: errors.array()
            });
    }

    user
        .createProduct({
            title: title,
            description: description,
            imageUrl: imageUrl,
            price: price
        })
        .then(() => {
            res.redirect('/admin/products');
        })
        .catch(error => {
            console.log(error);
        })

}


exports.getAdminProductsPage = (req, res, next) => {
    req.user
        .getProducts()
        .then(products => {
            res.render('admin/products',
                {
                    pageTitle: 'Admin Products',
                    products: products,
                    path: 'admin/products'
                });
        })
        .catch(error => {
            console.log(error);
        });
}

exports.getEditPage = (req, res, next) => {
    const prodId = req.params.productId;
    const userId = req.user.id;

    Product.findOne({
        where: {
            id: prodId,
            userId: userId,
        }
    })
        .then(product => {
            res.render('admin/edit-product', {
                product: product,
                pageTitle: 'Edit Product',
                path: 'admin/products',
                errors: null
            })
        })
        .catch(error => console.log(error));
}

exports.updateProduct = (req, res, next) => {
    const productId = req.params.productId;
    const title = req.body.title;
    const imageUrl = req.body.imageUrl;
    const description = req.body.description;
    const price = req.body.price;
    const userId = req.user.id;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log(errors);
        return res.status(422).render('admin/edit-product',
            {
                pageTitle: 'Edit Product',
                path: 'admin/products',
                product: {
                    title, imageUrl, description, price, userId, id: productId
                },
                errors: errors.array()
            });
    }

    Product.update({
        title: title,
        description: description,
        imageUrl: imageUrl,
        price: price
    }, {
            where: {
                id: productId,
                userId: userId
            }
        })
        .then(() => {
            res.redirect('/admin/products');
        })
        .catch(error => console.log(error));
}

exports.deleteProduct = (req, res, next) => {
    const productId = req.params.productId;
    const userId = req.user.id;

    Product.destroy({
        where: {
            id: productId,
            userId: userId
        }
    }).then(() => {
        res.redirect('/admin/products');
    }).catch(error => console.log(error));
}