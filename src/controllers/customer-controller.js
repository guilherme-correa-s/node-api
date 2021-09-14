"use strict";

const repository = require("../repositories/customer-repository");
const ValidationContract = require("../validators/fluent-validator");
const md5 = require('md5');
require('dotenv').config('../.env');
const authService = require('../service/auth-service');
const emailService = require('../service/email.service');

const saltKey = process.env.SALT_KEY;
const emailTemplate = process.env.EMAIL_TMPL

exports.post = async (req, res, next) => {
    let contract = new ValidationContract();
    contract.hasMinLen(
        req.body.name,
        3,
        "O nome deve conter pelo menos 3 caracteres"
    );

    contract.isEmail(req.body.email, "E-mail inválido");

    contract.hasMinLen(
        req.body.password,
        6,
        "A senha deve conter pelo menos 6 caracteres"
    );

    if (!contract.isValid()) {
        res.status(400).send(contract.errors()).end();
        return;
    }
    const userExist = await repository.get(req.body);
    if (userExist) {
        res.status(400).send({ message: 'Usuário já cadastrado.' });
        return;
    }
    try {
        await repository.create({
            name: req.body.name,
            email: req.body.email,
            password: md5(req.body.password + saltKey),
            roles: ['user']
        });

        emailService.send(req.body.email, 'Bem vindo ao Node Store', emailTemplate.replace
        ('{0}', req.body.name));

        res.status(201).send({
            message: "Cliente cadastrado com sucesso!",
        });
    } catch (e) {
        res.status(500).send({
            message: "Falha ao processar sua requisição",
        });
    }
};

exports.authenticate = async (req, res, next) => {
    try {
        const customer = await repository.authenticate({
            email: req.body.email,
            password: md5(req.body.password + saltKey)
        });
        if (!customer) {
            res.status(404).send({
                message: 'Usuário ou senha inválidos'
            })
            return;
        }
        const token = await authService.generateToken({
            id: customer._id,
            email: customer.email,
            name: customer.name,
            roles: customer.roles
        });

        res.status(201).send({
            token: token,
            data: {
                email: customer.email,
                name: customer.name
            }
        });
    } catch (e) {
        res.status(500).send({
            message: "Falha ao processar sua requisição",
        });
    }
};
