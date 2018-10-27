'use strict';

const PRODUCTTAX = [
    {
        id: 1,
        name: 'Food',
        refundable: true,
        calculate: (price) => {
            return (10 * price) / 100;
        }        
    },
    {
        id: 2,
        name: 'Tobacco',
        refundable: false,
        calculate: (price) => {
            return 10 + ((2 * price) / 100)
        }
    },
    {
        id: 3,
        name: 'Entertainment',
        refundable: false,
        calculate: (price) => {
            if (price >= 100) {
                return ((price - 100) * 1) / 100;
            } else {
                return 0;
            }
        }
    }
]

const getProductTax = function(taxcode) {    
    return PRODUCTTAX.find(el => el.id === taxcode);
}

exports.setProduct = function (price, taxcode) {
    const tax = getProductTax(taxcode);
    return {
        tax_amount: tax.calculate(price),
        refundable: tax.refundable
    }
}


// exports.getTaxAmount = function(price, taxcode) {
//     const tax = getProductTax(taxcode);
//     return tax.calculate(price);
// }

// exports.getRefundStatusProduct = function(taxcode) {
//     const tax = getProductTax(taxcode);
//     return tax.refundable;
// }

module.exports = exports;
