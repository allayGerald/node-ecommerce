const User = require('../models/user');
const Cart = require('../models/cart');
const bcrypt = require('bcryptjs');

exports.getLoginPage = (req, res, next) => {
  res.render('auth/login', {
    pageTitle: 'User Login : ',
    path: 'login',
    errorMessage: req.flash('error')
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
      .catch((error) => {
        res.redirect('/signup');
        console.log(error);
      });
  } else {
    res.redirect('/signup');
    console.log('passord mismatch');
  }

}

exports.postLogin = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  User.findOne({
    where: { email: email }
  }).then(user => {
    if (!user) {
      req.flash('error', 'Invalid Email or password');
      return res.redirect('/login');
    }

    bcrypt.compare(password, user.password)
      .then(doMatch => {
        if (doMatch) {
          req.session.isLoggedIn = true;
          req.session.user = user;
          return req.session.save(error => {
            return res.redirect('/');
          });
        }
        return res.redirect('/login');
      })
      .catch(error => {
        console.log(error);
        return res.redirect('/login');
      })
  })
};

exports.postLogout = (req, res, next) => {
  req.session.destroy((error) => {
    console.log(error);
    res.redirect('/');
  });
};