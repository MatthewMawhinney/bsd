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
                        email: user.email,
                        favorites: user.favorites
                    }
                });
            } else {
                return res.json({ sucess: false, msg: 'Wrong password.' });
            }
        });
    });
});


// Get All Favorites Belongs to the UserId
router.get('/getFavs', (req, res) => {
    // TODO: Get user id from frontend by body
    // const uid = req.body.uid;

    // hard coded value will be replaced later
    const uid = "5b2fd20075b7f6169c1b2f94";

    User.getFavsByUserId(uid, (err, favs) => {
        if(err){
            console.log(err);
        }
        res.send(favs); // provides array of places 
    });
});

router.post('/updateFav', (req, res) => {
    // TODO: Get POST request and set uid:string and place{}
    // const uid = req.body.uid; // string
    // const place = req.body.place;
    
    // hard coded value will be replaced later
    uid = "5b2fd20075b7f6169c1b2f94";
    place = {
        "id": "2",
        "vicinity": "A Subway"
    };
    
    User.updateFav(uid, place, (err, result) => {
        if(err){
            console.log(err);
        }
        res.send(result); // provides updated array of place
    });
});

module.exports = router;
