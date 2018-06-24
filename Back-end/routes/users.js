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
        favourites: req.body.favourites
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
                        favourites: user.favourites
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
    // const id = req.body.uid;

    // hard coded value will be replaced later
    const uid = "5b29255b8b2a973a88a008bf";

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
    uid = "5b29255b8b2a973a88a008bf";
    place = {
        "geometry": {
            "location": {
                "lat": 43.72474649999999,
                "lng": -79.8009029
            },
            "viewport": {
                "northeast": {
                    "lat": 43.72622298029149,
                    "lng": -79.79909946970848
                },
                "southwest": {
                    "lat": 43.72352501970849,
                    "lng": -79.8017974302915
                }
            }
        },
        "icon": "https://maps.gstatic.com/mapfiles/place_api/icons/generic_business-71.png",
        "id": "7de8aa353368060de834f05788da333a5886413b",
        "name": "Loafer's Lake Recreation Centre",
        "opening_hours": {
            "open_now": false,
            "weekday_text": []
        },
        "photos": [
            {
                "height": 3040,
                "html_attributions": [
                    "<a href=\"https://maps.google.com/maps/contrib/102143845497921441064/photos\">Edward Fung<\/a>"
                ],
                "photo_reference": "CmRaAAAAE4PXiV_FIbunrpf4aG5RsEUjryzHFYbd58BNbd0yrH6lWQUG-V3FPHoFEjXabl1GbmocRL1jUQiCBs1xArrUU-9Le_SBLnmtknmXJcRMPCDFVwiQyBrBqkjrsJ4HIEhBEhCvt3uZM2jgjIQjwL0JDuF_GhRlBNOgKZT51EtWHOa2ds5JYtm2vg",
                "width": 4056
            }
        ],
        "place_id": "ChIJNYWLF5oWK4gRcQyRw8e1NNk",
        "rating": 4.2,
        "reference": "CmRSAAAACi7_BFywMejTJM5av9YwKmW6lcmreU97kQoGIjtxfU8oN6LpVGWpGcGA00DO7W6Pci7k7ZPf6cUB5ISfJmGNFzodbQNHm1HKWx3veeXiYr5KWsa8kMidSDIPrX6Ni4aHEhBgKLEydUKP2VK_bPUGLh63GhShzOFv80GUGqYs5nRPQfgqSSoxWQ",
        "scope": "GOOGLE",
        "types": [
            "point_of_interest",
            "establishment"
        ],
        "vicinity": "30 Loafers Lake Lane, Brampton"
    };
    
    User.updateFav(uid, place, (err, result) => {
        if(err){
            console.log(err);
        }
        res.send(result); // provides updated array of place
    });
});

module.exports = router;
