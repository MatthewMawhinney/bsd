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
        password: req.body.password,
        favorites: req.body.favorites
    });
    
    User.getUserByUsername(newUser.username, (err, user) => {
        if(err) throw err;
        if(user) {
            res.json({ success: false, msg: 'Username already exists' });
            return false;
        } else {
            User.getUserByEmail(newUser.email, (err, user) => {
                if(err) throw err;
                if(user) {
                    res.json({ success: false, msg: 'Email is already registered' });
                    return false;
                } else {
                    User.addUser(newUser, (err, user) => {
                        if (err) {
                            res.json({ success: false, msg: 'Failed to register user, try again' });
                        } else {
                            res.json({ success: true, msg: 'Welcome to Backseat Driver!' });
                        }
                    });
                }
            })
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
                        email: user.email,
                        favorites: user.favorites
                    }
                });
            } else {
                return res.json({ success: false, msg: 'Wrong password.' });
            }
        });
    });
});


// Get All Favorites Belongs to the UserId
router.post('/getFavs', (req, res) => {
    // TODO: Get user id from frontend by body
    let getPins = {
        uid: req.body.id
    };
    // hard coded value will be replaced later
    //const uid = "5b29255b8b2a973a88a008bf";

    User.getFavsByUserId(getPins.uid, (err, favs) => {
        if(err){
            console.log(err);
        }
        res.send(favs); // provides array of places 
    });
});

router.post('/addPin', (req, res) => {
    // TODO: Get POST request and set uid:string and place{}
    let newPin = {
        uid: req.body.uid,
        place: req.body.place
    };
    
    User.updateFav(newPin.uid, newPin.place, (err, result) => {
        if(err) {
            res.json({ success: false, msg: 'Pin could not be added ' });
        } else {
            res.json({ success: true, msg: 'Added Pin' });
        }
        //res.json(result); // provides updated array of place
    });
});

module.exports = router;
