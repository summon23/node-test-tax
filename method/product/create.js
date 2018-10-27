'use strict';

const ProductDomain = require('../../domain/product');
const TaxDomain = require('../../domain/tax');
const ProductRepo = require('../../repositories/product');

const productTax = async function productTax(request, res, next) {    
    let product = request.body;

    try {
        product = await ProductDomain.validateNewProduct(product);
    } catch (err) {
        return res.BadRequest(err.message);
    }

    try {
        await ProductRepo.insertOne(product);
    } catch (err) {
        return res.BadRequest(err.message);
    }

    const {
        price,
        tax_code        
    } = product;

    const tax = TaxDomain.setProduct(price, tax_code);
    // const productTax = TaxDomain.getTaxAmount(price, tax_code);
    // const productRefund = TaxDomain.getRefundStatusProduct(tax_code);

    const {
        tax_amount: productTax,
        refundable: productRefund
    } = tax;

    Object.assign(product, { 
        tax: productTax,
        refundable: productRefund ? 'Refundadble' : 'Not Refundable',
        amount: price + productTax
    });
    
    return res.response(
        {
            message: "Product Submited",
            data: product
        }
    );
}

module.exports = {
    ENDPOINT: '/submit',
    METHODTYPE: 'POST',
    MAINFUNCTION: productTax,
    MIDDLEWARE: null
}