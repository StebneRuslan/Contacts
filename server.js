'use strict';

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const http = require('http').Server(app);
const contact = require('./constacts/contact');
const group = require('./groups/group');

require('./db');

http.listen(3000, function () {
    console.log('3000');
});

app.use(bodyParser.json());

app.use('/api/v1', contact);
app.use('/api/v1', group);
app.use(express.static(__dirname + '/static/'));

module.exports = app;
