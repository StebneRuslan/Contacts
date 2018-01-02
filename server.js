'use strict';

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const http = require('http').Server(app);
const contact = require('./constacts/contact');

require('./db');

http.listen(3000, function () {
    console.log('3000');
});

app.use(bodyParser.json());

app.use('/api/v1', contact);
app.use(express.static(__dirname + '/static/'));

module.exports = app;
