const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const apiUrl = '/api/v1';

app.use(bodyParser.urlencoded({ extended: false }))


const authentication = require('./authentication/index');

app.use(`${apiUrl}/authentication`, authentication.router);


module.exports = app;