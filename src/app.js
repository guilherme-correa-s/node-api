'use strict';

const express = require('express');

const app = express();

const indexRoute = require('./routes/index-route');
const productRoute = require('./routes/product-route');

app.use(express.urlencoded({ extended: false }));
app.use(express.json());



app.use('/', indexRoute);
app.use('/products', productRoute);

module.exports = app;