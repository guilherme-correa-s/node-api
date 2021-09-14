"use strict";
const mongoose = require("mongoose");
const Customer = mongoose.model("Customer");

exports.create = async (data) => {
    const customer = new Customer(data);
    await customer.save();
};

exports.get = async (data) => {
    const user = await Customer.findOne({ email: data.email });
    return user;
}

exports.authenticate = async (data) => {
    const res = await Customer.findOne({ email: data.email, password: data.password })
    return res;
};