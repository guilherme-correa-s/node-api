"use strict";

const express = require("express");
const mongoose = require("mongoose");
require('dotenv').config('../.env');
const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;

const app = express();
const uri = `
mongodb+srv://${dbUser}:${dbPassword}@node-store.utlje.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const Product = require("./models/product");
const Customer = require("./models/customer");
const Order = require("./models/order");

const indexRoute = require("./routes/index-route");
const productRoute = require("./routes/product-route");
const customerRoute = require("./routes/customer-route");
const orderRoute = require("./routes/order-route");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/", indexRoute);
app.use("/products", productRoute);
app.use("/customers", customerRoute);
app.use("/orders", orderRoute);

app.all("*", function (req, res) {
    res.status(404).send({ message: "Endpoint was not found" });
});
app.all("/*", (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");

    res.header("Access-Control-Allow-Methods", "*");

    res.header(
        "Access-Control-Allow-Headers",
        "Access-Control-Allow-Headers, Origin, Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, Authorization, x-access-token"
    );

    next();
});

module.exports = app;
