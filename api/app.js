const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const session = require('express-session')

const apiUrl = '/api/v1';

const sessionSecret = process.env.SESSION_SECRET;
const minute = 1000 * 60; 

const sessionOptions = {
    secret: sessionSecret,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: true,  maxAge: minute}
}

app.set('trust proxy', 1);

app.use(bodyParser.urlencoded({ extended: false }))
app.use(session(sessionOptions));

const authentication = require('./authentication/index');
const user = require('./user/index');

app.use(`${apiUrl}/authentication`, authentication.router);
app.use(`${apiUrl}/user`, user.router);

module.exports = app;