const User = require('../models/user');

exports.getLoginPage = (req, res, next) => {
   const isLoggedIn = req.get('Cookie');
   console.log(isLoggedIn);
    res.render('auth/login', {
        pageTitle: 'User Login : ',
        path: 'login',
        isLoggedIn: false
    });
}

exports.postLogin = (req, res, next) => {
  req.session.isLoggedIn = true;
    res.redirect('/');
};