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


exports.getAdminProductsPage = (req, res, next) => {
    Product.fetchAll()
    .then(([products, fieldData]) => {
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
    Product.findById(prodId, product => {
        res.render('admin/edit-product',{
                product: product,
                pageTitle: 'Edit Product', 
                path: 'admin/products'
            })
    });
}