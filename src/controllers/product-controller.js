"use strict";

const moongose = require("mongoose");
const Product = moongose.model("Product");
const repository = require("../repositories/product-repository");

exports.get = async (req, res, next) => {
  try {
    let data = await repository.get();
    res.status(200).send(data);
  } catch (e) {
    res.status(500).send({
      message: "Falha  ao processar sua requisição",
    });
  }
};

exports.getBySlug = async (req, res, next) => {
  try {
    let data = await repository.getBySlug(req.params.slug);
    res.status(200).send(data);
  } catch (e) {
    res.status(500).send({
      message: "Falha  ao processar sua requisição",
    });
  }
};

exports.getById = async (req, res, next) => {
  try {
    let data = await repository.getById(req.params.id);
    res.status(200).send(data);
  } catch (e) {
    res.status(500).send({
      message: "Falha  ao processar sua requisição",
    });
  }
};

exports.getByTag = async (req, res, next) => {
  try {
    let data = await repository.getByTags(req.params.tag);
    res.status(200).send(data);
  } catch (e) {
    res.status(500).send({
      message: "Falha  ao processar sua requisição",
    });
  }
};

exports.post = async (req, res, next) => {
  try {
    await repository.create(req.body);
    res.status(201).send({
      message: "Produto cadastrado com sucesso!",
    });
  } catch (e) {
    res.status(500).send({
      message: "Falha  ao processar sua requisição",
    });
  }
};

exports.put = async (req, res, next) => {
  try {
    await repository.update(req.params.id, req.body);
    res.status(200).send({
      message: "Produto atualizado com sucesso!",
    });
  } catch (e) {
    res.status(500).send({
      message: "Falha  ao processar sua requisição",
    });
  }
};

exports.delete = async (req, res, next) => {
  try {
    const id = req.params.id;
    await repository.delete(id);
    res.status(200).send({
      message: "Produto deletado com sucesso!",
    });
  } catch (e) {
    res.status(500).send({
      message: "Falha  ao processar sua requisição",
    });
  }
};
