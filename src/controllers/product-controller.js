"use strict";

const moongose = require("mongoose");
const Product = moongose.model("Product");
const repository = require("../repositories/product-repository");

exports.get = (req, res, next) => {
  repository
    .get()
    .then((data) => {
      res.status(200).send(data);
    }).catch((e) => {
      res.status(400).send(e);
    });
};

exports.getBySlug = (req, res, next) => {
  repository
    .getBySlug(req.params.slug)
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((e) => {
      res.status(400).send(e);
    });
};

exports.getById = (req, res, next) => {
  repository.getById(req.params.id)
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((e) => {
      res.status(400).send(e);
    });
};

exports.getByTag = (req, res, next) => {
  repository
    .getByTags(req.params.tag)
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((e) => {
      res.status(400).send(e);
    });
};

exports.post = (req, res, next) => {
  repository
    .create(req.body)
    .then((x) => {
      res
        .status(201)
        .send({ message: "Sucesso ao cadastrar produto.", data: x });
    })
    .catch((e) => {
      res.status(201).send({ message: "Falha ao cadastrar produto.", data: e });
    });
};

exports.put = (req, res, next) => {
  const id = req.params.id;
  Product.findByIdAndUpdate(id, {
    $set: {
      title: req.body.title,
      description: req.body.description,
      price: req.body.price,
    },
  })
    .then((x) => {
      res.status(200).send({
        message: "Sucesso ao atualizar o produto.",
        data: x,
      });
    })
    .catch((e) => {
      res.status(201).send({
        message: "Falha ao atualizar o produto.",
        data: e,
      });
    });
};

exports.delete = (req, res, next) => {
  const id = req.params.id;
  Product.findByIdAndRemove(id)
    .then((x) => {
      res.status(200).send({
        message: "Sucesso ao atualizar o produto.",
        data: x,
      });
    })
    .catch((e) => {
      res.status(201).send({
        message: "Falha ao atualizar o produto.",
        data: e,
      });
    });
};
