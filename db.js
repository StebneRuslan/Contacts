'use strict';

const mongoose = require('mongoose');

mongoose.connect('mongodb://Ruslan:1993@ds135917.mlab.com:35917/contacts', err => {
    if (err) {
        console.log(err);
    }
    console.log('Connect');
});

module.exports = mongoose;