const express = require('express');
const router = express.Router();
const Users = require('../models/user');

//TEST
router.get('/test', (req, res) => {
    res.send('Hello World')
    res.end();
});

router.get('/users', (req, res) => {
    Users.find({}, (err, users) => {
        if (err) {
            console.error(err);
        }
        // res.set('Access-Control-Allow-Origin', '*');
        res.send(users);
        res.end();
    })
    console.log('inside Users');
});

module.exports = router;