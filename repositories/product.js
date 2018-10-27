'use strict';

const DB = require('../modules/Database');

exports.insertOne = async function (product) {
    const model = DB.getInstance();
    return model.Product.create(product);
}

module.exports = exports;
