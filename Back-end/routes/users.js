const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/db')

const User = require('../models/user');

//Register
router.post('/register', (req, res) => {
    let newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    });
    User.addUser(newUser, (err, user) => {
        if(err){
            res.json({success: false, msg: 'Failed to register user'});
        } else {
            res.json({success: true, msg: 'Registered User'});
        }
    });
});

//Authenticate
router.post('/authenticate', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    User.getUserByUsername(username, (err, user) => {
        if(err) throw err;
        if(!user) {
            return res.json({sucess: false, msg: 'User not found.'});
        }
        User.comparePassword(password, user.password, (err, isMatch) => {
            if(err) throw err;
            if(isMatch){
                const token = jwt.sign(user.toJSON(), config.secret, {
                    expiresIn: 604800 //1 Week of seconds
                });
                res.json({
                    success: true,
                    token: 'JWT ' + token,
                    user: {
                        id: user._id,
                        username: user.username,
                        email: user.email
                    }
                });
            } else {
                return res.json({ sucess: false, msg: 'Wrong password.' });
            }
        });
    });
});


module.exports = router;