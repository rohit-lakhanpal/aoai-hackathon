var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var config = require('./utilities/config');

// Validate if configurations are set approporiately
config.validate();

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

var apiBase = '/api';
app.use(`${apiBase}/`, require('./routes/index'));
app.use(apiBase + '/speech/token', require('./routes/speech/token'));

module.exports = app;
