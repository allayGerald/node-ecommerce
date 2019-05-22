const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
    res.render('admin/add-product',
        { pageTitle: 'Add Product', path: 'admin/add-product' }
    );
}

exports.postAddProduct = (req, res, next) => {
    const title = req.body.title;
    const imageUrl = req.body.imageUrl;
    const description = req.body.description;
    const price = req.body.price;
    const userId = req.user.id;

    req.user.createProduct({
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
    Product.findAll()
        .then(products => {
            res.render('admin/products',
                { pageTitle: 'Admin Products', products: products, path: 'admin/products' }
            );
        })
        .catch(error => {
            console.log(error);
        });
}

exports.getEditPage = (req, res, next) => {
    const prodId = req.params.productId;
    Product.findByPk(prodId)
        .then(product => {
            res.render('admin/edit-product', {
                product: product,
                pageTitle: 'Edit Product',
                path: 'admin/products'
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
    const productId = req.params.productId;

    Product.destroy({
        where: {
            id: productId
        }
    }).then(() => {
        res.redirect('/admin/products');
    }).catch(error => console.log(error));
}