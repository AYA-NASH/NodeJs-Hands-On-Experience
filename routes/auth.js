const express = require('express');
const {check, body} = require('express-validator')

const authController = require('../controllers/auth');
const User = require('../models/user');

const router = express.Router();

router.get('/login', authController.getLogin);
router.get('/signup', authController.getSignup);

router.post('/login', authController.postLogin);

router.post('/signup',
        [
            check('email')
            .isEmail()
            .withMessage('Invalid Email')
            .custom((value)=>{
                // Asynchronous validation, since we need to access the database
                return User.findOne({ email: value })
                    .then(user => {
                        if (user) {
                        return Promise.reject('E-mail already in use');
                        }
                    });
            }),

            body('password',
             'Please enter a password with at least 5 characters.'
            )
            .isLength({min:5})
            .isAlphanumeric(),

            body('confirmPassword')
            .custom((value, { req })=>{
                if(value !== req.body.password){
                    throw new Error('Passwords have to match!!!!');
                }
                return true;
            })
        ],
        authController.postSignup);

router.post('/logout', authController.postLogout);

module.exports = router;