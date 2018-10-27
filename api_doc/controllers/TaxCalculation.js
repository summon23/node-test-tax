'use strict';

var utils = require('../utils/writer.js');
var TaxCalculation = require('../service/TaxCalculationService');

module.exports.calculateProductTax = function calculateProductTax (req, res, next) {
  var body = req.swagger.params['body'].value;
  TaxCalculation.calculateProductTax(body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
