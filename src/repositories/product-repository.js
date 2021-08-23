"use strict";
const mongoose = require("mongoose");
const Product = mongoose.model("Product");

exports.get = () => Product.find({ active: true }, "title price slug");

exports.getBySlug = (slug) =>
    Product.findOne(
        {
            active: true,
            slug: slug
        },
        "id title price slug"
    );

exports.getById = (id) => Product.findById(id);

exports.getByTags = (tag) =>
    Product.find(
        {
            active: true,
            tags: tag
        },
        "title description price slug tags"
    );

exports.create = (data) => {
    let product = new Product(data);
    return product.save();
}

