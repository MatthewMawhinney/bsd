const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config/db');

mongoose.connect(config.database);

mongoose.connection.on('connected', () => {
    console.log('Connected to Mongo');
})

mongoose.connection.on('error', (err) => {
    console.log('Database error ' + err);
});

const app = express();

const users = require('./routes/users');

// TODO: enable this when deploy
// const port = process.env.PORT||8080;
const port = 3000;

app.use(cors());

//set static folder
app.use(express.static(path.join(__dirname, '/dist')));

//body parser middleware
app.use(bodyParser.json());

//passport
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

app.use('/users', users);

app.listen(port, () => {
    console.log("Server started on port " + port);
});