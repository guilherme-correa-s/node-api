"use strict";

const repository = require("../repositories/order-repository");
const uuid = require("uuid");

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

exports.post = async (req, res, next) => {
    try {
        await repository.create({
            customer: req.body.customer,
            number: uuid.v4().substring(0, 6),
            items: req.body.items,
        });
        res.status(201).send({
            message: "Pedido cadastrado com sucesso!",
        });
    } catch (e) {
        res.status(500).send({
            message: "Falha  ao processar sua requisição",
        });
    }
};
