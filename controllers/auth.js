const User = require('../models/user');
const Cart = require('../models/cart');
const bcrypt = require('bcryptjs');

exports.getLoginPage = (req, res, next) => {
  res.render('auth/login', {
    pageTitle: 'User Login : ',
    path: 'login',
    isLoggedIn: false
  });
}

exports.getSignupPage = (req, res, next) => {
  res.render('auth/signup', {
    pageTitle: 'Sign Up',
    path: 'signup',
    isLoggedIn: false
  });
}

exports.postSignup = (req, res, next) => {
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;
  const passwordConfirm = req.body.passwordConfirm;

  if (password === passwordConfirm) {
    bcrypt.hash(password, 12)
      .then((hashedPassword) => {
        return User.create({
          email: email,
          password: hashedPassword,
          name: name
        })
      })
      .then((user) => {
        return user.createCart();

      })
      .then(
        () => {
          res.redirect('/login');
        }
      )
      .catch(error => console.log(error));
  } else {
    res.redirect('/signup');
    console.log('passord mismatch');
  }

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