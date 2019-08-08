const User = require('../models/user');

exports.getLoginPage = (req, res, next) => {
  res.render('auth/login', {
    pageTitle: 'User Login : ',
    path: 'login',
    isLoggedIn: false
  });
}

exports.postLogin = (req, res, next) => {
  User.findByPk(1)
    .then(user => {
      req.session.isLoggedIn = true;
      req.session.user = user;
      res.redirect('/');
    })
};

exports.postLogout = (req, res, next) => {
  req.session.destroy((error) => {
    console.log(error);
    res.redirect('/');
  });
};