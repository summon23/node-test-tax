'use strict';

const test = require('ava');
const sinon = require('sinon');

const ProductRepo = require('../../../repositories/product');
const Method = require('../../../method/product/create');
const responseHandler = require('../../../utils/response_handler');

test.serial('Should return Product Submited', async function (t) {
    t.context.sandbox.stub(ProductRepo, 'insertOne').resolves(true);
    const payload = {
        body: {
            name: 'Big Mac',
            tax_code: 1,
            price: 1000
        }
    }
    try {
        const res = await Method.MAINFUNCTION(payload, responseHandler);
        t.deepEqual(res.status, 200);
        t.deepEqual(res.data.message, 'Product Submited');
    } catch (err) {
        t.fail('Should return Product Submited')
    }
});


test.serial('Should return BadRequest Not Valid Payload', async function (t) {
    const payload = {
        body: {
            name: 'Big Mac',
            tax_code: 30,
            price: 1000
        }
    }
    try {
        const res = await Method.MAINFUNCTION(payload, responseHandler);
        // console.log(res);
        t.deepEqual(res.status, 400);
        t.deepEqual(res.data.message, 'ValidationError: child "tax_code" fails because ["tax_code" must be one of [1, 2, 3]]');
        // t.fail('Should return BadRequest Not Valid Payload');
    } catch (err) {
        t.fail('Should return BadRequest Not Valid Payload')
    }
});

test.beforeEach('Initialize New Sandbox Before Each Test', async function (t) {
    t.context.sandbox = sinon.sandbox.create().usingPromise(Promise.Promise);
});

test.afterEach.always('Restore Sandbox and Configuration After Each Test', async function (t) {
    t.context.sandbox.restore();
});