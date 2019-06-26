const User = require('../models/user');

exports.getLoginPage = (req, res, next) => {
    res.render('auth/login', {
        pageTitle: 'User Login : ',
        path: 'login'
    });
}