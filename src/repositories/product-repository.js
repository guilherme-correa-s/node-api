"use strict";
const mongoose = require("mongoose");
const Product = mongoose.model("Product");

exports.get = async () => {
    const res = await Product.find({
        active: true,
    });
    return res;
};

exports.getBySlug = async (slug) => {
    const res = await Product.findOne(
        {
            active: true,
            slug: slug,
        },
        "id title price slug"
    );
    return res;
};

exports.getById = async (id) => {
    const res = await Product.findById(id);
    return res;
};

exports.getByTags = async (tag) => {
    const res = await Product.find(
        {
            active: true,
            tags: tag,
        },
        "title description price slug tags"
    );
    return res;
};

exports.create = async (data) => {
    const product = new Product(data);
    await product.save();
};

exports.update = async (id, data) => {
    await Product.findByIdAndUpdate(id, {
        $set: {
            title: data.title,
            description: data.description,
            price: data.price,
        },
    });
};

exports.delete = async (id) => {
    await Product.findByIdAndRemove(id);
};
