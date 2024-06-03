const {body} = require('express-validator');
const express = require('express');

const User = require('../models/user');
const authController = require('../controllers/auth');
const router = express.Router();

router.put('/signup', [
    body('email')
        .isEmail()
        .withMessage('Please Enter a valid email address')
        .custom((value, {req})=>{
            return User.findOne({email: value})
                        .then(userDoc=>{
                            if(userDoc){
                                return Promise.reject('E-mail already exists!!')
                            }
                        });
        })
        .normalizeEmail(),
    
    body('password')
        .isLength({min: 5})
        .trim(),
    
    body('name')
        .trim()
        .not()
        .isEmpty()
], authController.signup);

router.post('/login', authController.login);

module.exports = router;