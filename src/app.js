"use strict";

const express = require("express");
const mongoose = require("mongoose");

const app = express();

const uri =
  "mongodb+srv://guiadm:guiteste@node-store.utlje.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const Product = require("./models/product");

const indexRoute = require("./routes/index-route");
const productRoute = require("./routes/product-route");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/", indexRoute);
app.use("/products", productRoute);

module.exports = app;
