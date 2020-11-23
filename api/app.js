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
    cookie: { maxAge: minute }
}

app.set('trust proxy', 1);

app.use(bodyParser.urlencoded({ extended: false }))
app.use(session(sessionOptions));

const { userRouter } = require('./user');
const { postRouter } = require('./post');

app.use(`${apiUrl}/user`, userRouter);
app.use(`${apiUrl}/post`, postRouter);

module.exports = app;