const User = require('../models/user');

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
    User.create({
      email: email,
      password: password,
      name: name
    })
      .then(() => {
        console.log('success');
        res.redirect('/login');
      })
      .catch(error => console.log(error));
  } else {
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