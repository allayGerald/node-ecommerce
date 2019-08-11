const User = require('../models/user');
const Cart = require('../models/cart');
const bcrypt = require('bcryptjs');
const mailer = require('nodemailer');
const crypto = require('crypto');

const Sequelize = require('sequelize');
const Op = Sequelize.Op;

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
    errorMessage: req.flash('error'),
    successMessage: req.flash('success')
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

exports.getForgotPassword = (req, res, next) => {
  res.render('auth/forgot-password', {
    pageTitle: 'Forgot Password ?',
    path: 'forgot-password',
    errorMessage: req.flash('error'),
    successMessage: req.flash('success')
  });
}

exports.postForgotPassword = (req, res, next) => {
  const email = req.body.email;

  User.findOne({
    where: { email: email }
  })
    .then(user => {
      if (!user) {
        req.flash('error', 'There\'s No record of email you provided');
        return res.redirect('/forgot-password');
      }

      crypto.randomBytes(32, (error, buffer) => {
        if (error) {
          console.log(error);
          return req.redirect('/forgot-password');
        }

        const token = buffer.toString('hex');

        user.update({
          resetToken: token,
          tokenExpiration: Date.now() + 3600000 // date i n milliseconds
        })
          .then(result => {
            req.flash('success', 'Password Reset link sent to your email');
            res.redirect('/forgot-password');
            sendPasswordRecoveyMail(email, token);
          })
          .catch(error => {
            console.log(error);
            req.flash('error', 'Error creating Token, Please try again');
            return req.redirect('/forgot-password');
          })
      });
    })
}

exports.getResetPassword = (req, res, next) => {
  const token = req.params.token;

  User.findOne({
    where: {
      resetToken: token,
      tokenExpiration: { [Op.gt]: Date.now() }
    }
  })
    .then(user => {
      if (!user) {
        req.flash('error', 'Your token is invalid, try requesting new link');
        return res.redirect('/forgot-password');
      }

      res.render('auth/password-reset', {
        pageTitle: 'Reset Password',
        path: 'reset',
        userId: user.id,
        token: token,
        errorMessage: req.flash('error'),
        successMessage: req.flash('success')
      });
    })
}

exports.postResetPassword = (req, res, next) => {
  const userId = req.body.userId;
  const resetToken = req.body.resetToken;

  bcrypt.hash(req.body.password, 12)
    .then(hashedPassword => {
      User.update({
        password: hashedPassword
      },
        {
          where: {
            id: userId,
            resetToken: resetToken
          }
        })
        .then(user => {
          User.update({
            resetToken: null,
            tokenExpiration: null
          }, {
            where: {
              id: user
            }
          })
            .then(result => {
              req.flash('success', 'You have successfully recovered your password');
              return res.redirect('/login');
            });
        })
        .catch(error => {
          console.log(error);
          req.flash('error', 'Error');
          return res.redirect('/login');
        });
    })
    .catch(error => {
      console.log(error);
    });
}

const sendSignUpMail = (email) => {
  const message = {
    from: 'no-reply@shop.com',
    to: email,
    subject: 'SignUp Sucess',
    text: 'You have successfully Signed Up!' // Plain text body
  };

  transport.sendMail(message, function (err, info) {
    if (err) {
      console.log(err)
    } else {
      console.log(info);
    }
  });
}

const sendPasswordRecoveyMail = (email, token) => {
  const message = {
    from: 'no-reply@shop.com',
    to: email,
    subject: 'Password recovery link',
    html: `
        <p>Sorry to hear that you lost your password</p>
        <p>Please click this <a href="http://localhost:3000/reset/${token}"> link</a> to reset your password, You can ignore this message
        If you did'nt ask for password recovery</p>
    `
  };

  transport.sendMail(message, function (err, info) {
    if (err) {
      console.log(err)
    } else {
      console.log(info);
    }
  });
  return;
}


