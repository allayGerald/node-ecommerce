const express = require('express');
const User = require('../models/user');
const { check, body } = require('express-validator');

const router = express.Router();

const authController = require('../controllers/auth');

router.get('/login', authController.getLoginPage);
router.post('/login', check('email').isEmail(), authController.postLogin);
router.post('/logout',
 [
     body('email').isEmail().withMessage('Please Enter valid email')
 ],
    authController.postLogout
    );
router.get('/signup', authController.getSignupPage);
router.post('/signup',
    [
        check('email').isEmail().withMessage('Please enter valid email').custom((value, { req }) => {
            return User.findOne({
                where: {
                    email: value
                }
            })
                .then(user => {
                    if (user) {
                        return Promise.reject('Email already in use');
                    }
                });
        }),
        body('password', 'Password should be 6 characters long Minimum').isLength({ min: 6 }),
        body('passwordConfirm').custom((value, { req }) => {
            if (value !== req.body.password) {
                throw new Error('Password confirmation does not match password');
            }
            return true;
        })
    ],
    authController.postSignup
);
router.get('/forgot-password', authController.getForgotPassword);
router.post('/forgot-password', authController.postForgotPassword);
router.get('/reset/:token', authController.getResetPassword);
router.post('/reset', authController.postResetPassword);

module.exports = router;