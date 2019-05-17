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

    Product.create({
        title: title,
        description: description,
        imageUrl: imageUrl,
        price: price
    })
    .then()
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
    Product.findById(prodId)
    .then(([prod]) => {
        const product = prod[0];
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
    Product.update(req.body, productId)
    .then(() => {
        res.redirect('/admin/products');
    })
    .catch(error => console.log(error));
}