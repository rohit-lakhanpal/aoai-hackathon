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

app.use(apiBase + '/language/analyse-sentiment', require('./routes/language/analyse-sentiment'));
app.use(apiBase + '/language/extract-key-phrases', require('./routes/language/extract-key-phrases'));

app.use(apiBase + '/language/recognise-entities', require('./routes/language/recognise-entities'));
app.use(apiBase + '/language/recognise-healthcare-entities', require('./routes/language/recognise-healthcare-entities'));
app.use(apiBase + '/language/recognise-pii', require('./routes/language/recognise-pii'));

app.use(apiBase + '/openai/completion', require('./routes/openai/completion'));
module.exports = app;
