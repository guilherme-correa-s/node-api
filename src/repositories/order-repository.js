"use strict";
const mongoose = require("mongoose");
const Order = mongoose.model("Order");

exports.get = async () => {
    const res = await Order.find({}).populate("Product");
    return res;
};

exports.create = async (data) => {
    const order = new Order(data);
    await order.save();
};
