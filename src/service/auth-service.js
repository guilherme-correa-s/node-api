'use strict'
const jwt = require('jsonwebtoken');
require('dotenv').config('../.env');
const saltKey = process.env.SALT_KEY;

exports.generateToken = async (data) => {
    return jwt.sign(data, saltKey, { expiresIn: '1d' });
}

exports.decodeToken = async (token) => {
    const data = await jwt.verify(token, saltKey);
    return data;
}

exports.autorize = (req, res, next) => {
    const token = req.body.token || req.query.token || req.headers['x-access-token']

    if (!token) {
        res.status(401).send({
            message: "Acesso Restrito."
        })
    } else {
        jwt.verify(token, saltKey, (error, decoded) => {
            if (error)
                res.status(401).send({
                    message: 'Token Inválido.'
                })
            else 
                next();
        })
    }
}

exports.isAdmin = (req, res, next) => {
    const token = req.body.token || req.query.token || req.headers['x-access-token']

    if (!token) {
        res.status(401).send({
            message: "Acesso Restrito."
        })
    } else {
        jwt.verify(token, saltKey, (error, decoded) => {
            if (error)
                res.status(401).send({
                    message: 'Token Inválido.'
                })
            else 
                if (decoded.roles.includes('admin')) {
                    next();
                }
                else {
                    res.status(403).send({message: 'Esta funcionalidade é restrita para administradores.'});
                }
        })
    }
}