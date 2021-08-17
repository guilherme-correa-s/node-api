'use strict';

const express = require('express');
const mongoose = require('mongoose');

const app = express();

mongoose.connect('mongodb+srv://guiadm:guiadm@node-store.utlje.mongodb.net/test', { useNewUrlParser: true, useUnifiedTopology: true });

const Product = require('./models/product');

const indexRoute = require('./routes/index-route');
const productRoute = require('./routes/product-route');

app.use(express.urlencoded({ extended: false }));
app.use(express.json());



app.use('/', indexRoute);
app.use('/products', productRoute);

module.exports = app;