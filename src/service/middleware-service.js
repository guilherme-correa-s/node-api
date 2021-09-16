const ValidationContract = require("../validators/fluent-validator");
const mongoose = require('mongoose');

exports.customerMiddleware = (req, res, next) => {
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
    next();
}

exports.idMiddleware = (req, res, next) => {
    if (!mongoose.isValidObjectId(req.params.id)) {
        res.status(400).send({message: 'ID inválido'});
        return;
    }
    next();
}
