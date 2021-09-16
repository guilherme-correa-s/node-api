"use strict";

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
        if (!data) {
            res.status(404).send({message: 'Produto não encontrado'});
            return;
        }
        res.status(200).send(data);
    } catch (e) {
        res.status(500).send({
            message: "Falha ao processar sua requisição",
        });
    }
};

exports.getById = async (req, res, next) => {
    try {
        let data = await repository.getById(req.params.id);
        if (!data) {
            res.status(404).send({message: 'Produto não encontrado'});
            return;        
        }
        res.status(200).send(data);
    } catch (e) {
        res.status(500).send({
            message: "Falha ao processar sua requisição",
        });
    }
};

exports.getByTag = async (req, res, next) => {
    try {
        let data = await repository.getByTags(req.params.tag);
        if (data.length == 0) {
            res.status(404).send({message: 'Produto não encontrado'});
            return;        
        }
        res.status(200).send(data);
    } catch (e) {
        res.status(500).send({
            message: "Falha ao processar sua requisição",
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
            message: "Falha ao processar sua requisição",
            error: e.message
        });
    }
};

exports.put = async (req, res, next) => {
    try {
        const productPut = await repository.update(req.params.id, req.body);
        if (!productPut) {
            res.status(404).send({message: 'Produto não encontrado'});
            return;
        }
        res.status(200).send({
            message: "Produto atualizado com sucesso!"
        });
    } catch (e) {
        res.status(500).send({
            message: "Falha ao processar sua requisição",
        });
    }
};

exports.delete = async (req, res, next) => {
    try {
        const id = req.params.id;
        const resDelete = await repository.delete(id);
        if (!resDelete) {
            res.status(404).send({message: 'Produto não encontrado'});
            return;
        }
        res.status(200).send({
            message: "Produto deletado com sucesso!",
        });
    } catch (e) {
        res.status(500).send({
            message: "Falha ao processar sua requisição",
        });
    }
};
