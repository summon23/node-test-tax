'use strict';

const Joi = require('joi');

exports.validateNewProduct = async function validateNewProduct(product) {
    const schema = Joi.object().keys({
        name: Joi.string().required(),
        tax_code: Joi.number().valid(1,2,3).required(),
        price: Joi.number().positive().required()
    });

    try {
        return await Joi.validate(product, schema);
    } catch (err) {
        throw new Error(err);
    }
}

module.exports = exports;
