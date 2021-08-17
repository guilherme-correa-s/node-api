'use strict';

const moongose = require('mongoose');
const Product = moongose.model('Product');

exports.get = (req, res, next) => {
    Product.find({active:true}, 'title price slug')
        .then(data => {
            res.status(200).send(data);
        }).catch(e => {
            res.status(400).send(e);
        });
};

exports.post = (req, res, next) => {
    let product = new Product(req.body);
    product.save()
        .then(x => {
            res.status(201).send({message:"Sucesso ao cadastrar produto.", data: x});
        }).catch(e => {
            res.status(201).send({message: 'Falha ao cadastrar produto.', data: e});
        });
};

exports.put = (req, res, next) => {
    const id = req.params.id;
    res.status(201).send({
        id: id,
        item: req.body
    });
};

exports.delete = (req, res, next) => {
    res.status(200).send(req.body);
};