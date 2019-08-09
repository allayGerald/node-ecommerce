const Product = require('../models/product');
const User = require('../models/user');

exports.getAddProduct = (req, res, next) => {
    if (!req.session.isLoggedIn) {
        return res.redirect('/login')
    }
    res.render('admin/add-product',
        {
            pageTitle: 'Add Product',
            path: 'admin/add-product',
            isLoggedIn: req.session.isLoggedIn
        });
}

exports.postAddProduct = (req, res, next) => {
    if (!req.session.isLoggedIn) {
        return res.redirect('/login')
    }
    const title = req.body.title;
    const imageUrl = req.body.imageUrl;
    const description = req.body.description;
    const price = req.body.price;
    const userId = req.session.id;

    req.session.user
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
    if (!req.session.isLoggedIn) {
        return res.redirect('/login')
    }
    req.session.user
        .getProducts()
        .then(products => {
            res.render('admin/products',
                {
                    pageTitle: 'Admin Products',
                    products: products,
                    path: 'admin/products',
                    isLoggedIn: req.session.isLoggedIn
                });
        })
        .catch(error => {
            console.log(error);
        });
}

exports.getEditPage = (req, res, next) => {
    if (!req.session.isLoggedIn) {
        return res.redirect('/login')
    }
    const prodId = req.params.productId;
    Product.findByPk(prodId)
        .then(product => {
            res.render('admin/edit-product', {
                product: product,
                pageTitle: 'Edit Product',
                path: 'admin/products',
                isLoggedIn: req.session.isLoggedIn
            })
        })
        .catch(error => console.log(error));
}

exports.updateProduct = (req, res, next) => {
    if (!req.session.isLoggedIn) {
        return res.redirect('/login')
    }
    const productId = req.params.productId;
    const title = req.body.title;
    const imageUrl = req.body.imageUrl;
    const description = req.body.description;
    const price = req.body.price;
    Product.update({
        title: title,
        description: description,
        imageUrl: imageUrl,
        price: price
    }, {
            where: {
                id: productId
            }
        })
        .then(() => {
            res.redirect('/admin/products');
        })
        .catch(error => console.log(error));
}

exports.deleteProduct = (req, res, next) => {
    if (!req.session.isLoggedIn) {
        return res.redirect('/login')
    }
    const productId = req.params.productId;

    Product.destroy({
        where: {
            id: productId
        }
    }).then(() => {
        res.redirect('/admin/products');
    }).catch(error => console.log(error));
}