'use strict';
require('dotenv').config('../.env');
const sendgridKey = process.env.SEND_GRID_KEY;
const sendgrid = require('sendgrid')(sendgridKey);

exports.send = async (to, subject, body) => {
    sendgrid.send({
        to: to,
        from: 'guilhermescorrea@hotmail.com.br',
        subject: subject,
        html: body
    })
}