const User = require('../models/user');
const Cart = require('../models/cart');
const bcrypt = require('bcryptjs');
const mailer = require('nodemailer');

let transport = mailer.createTransport({
  host: 'smtp.mailtrap.io',
  port: 2525,
  auth: {
     user: '9cba8bde24f53e',
     pass: 'e2347b92fea4f6'
  }
});

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
    errorMessage: req.flash('error')
  });
}

exports.postSignup = (req, res, next) => {
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;
  const passwordConfirm = req.body.passwordConfirm;

  if (password !== passwordConfirm) {
    req.flash('error', 'passord mismatch');
    return res.redirect('/signup');
  }

  User.findOne({
    where: {
      email: email
    }
  })
    .then(user => {
      if (user) {
        req.flash('error', 'Email Alredy Taken');
        return res.redirect('/signup');
      }
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
            sendSignUpMail(email);
            res.redirect('/login');
          }
        )
    })
    .catch((error) => {
      res.redirect('/signup');
      console.log(error);
    });
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
        req.flash('error', 'Invalid Email or password');
        return res.redirect('/login');
      })
      .catch(error => {
        req.flash('error', 'Something Went Wrong');
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

const sendSignUpMail = (email) => {
  const message = {
    from: 'no-reply@shop.com', 
    to: email,        
    subject: 'SignUp Sucess', 
    text: 'You have successfully Signed Up!' // Plain text body
  };
  
  transport.sendMail(message, function(err, info) {
  if (err) {
    console.log(err)
  } else {
    console.log(info);
  }
});
}


