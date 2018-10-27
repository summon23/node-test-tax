'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const modelPath = './model';
const config = require('../../config');
// Load Env File
config.loadEnvironment();

const models = {};
let modelsInitialized = false;

exports.getContext = async function getContext() {
    if (modelsInitialized === true) {
        return models;
    }

    let DB = null;
    
    DB = new Sequelize(process.env.DB_CONNECTION_STRING, {
        dialect: 'mysql',
        logging: true,
        pool: {
            min: 0,
            max: 5,
            idle: 10000,
            evict: 10000,
        },
        operatorsAliases: false,
    });

    DB.authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        throw new Error ('Unable to connect to the database');
    });
    

    //migrate Database
    fs.readdirSync(path.join(__dirname, '../../', modelPath)).filter((file) => {
        return (file.indexOf('.') !== 0) && (path.extname(file) === '.js') && (file !== 'index.js');
    }).forEach((file) => {
        const model = DB.import(path.join(__dirname, '../../' ,modelPath, file));        
        models[model.name] = model;
    });

    return models;
};

exports.getInstance = () => models;

exports.startTransaction = async function startTransaction() {
    models.db_transaction = await models.context.transaction({
        isolationLevel: models.context.Transaction.ISOLATION_LEVELS.READ_UNCOMMITTED
    });
};

exports.commit = async function commit() {
    if (models.db_transaction) {
        await models.db_transaction.commit();
        models.db_transaction = null;
    }
};

exports.rollback = async function rollback() {
    if (models.db_transaction) {
        await models.db_transaction.rollback();
        models.db_transaction = null;
    }
};

exports.closeContext = async function closeContext() {
    if (models && models.context) {
        const result = await models.context.close();
        models = {
            ORMProvider: Sequelize
        };
        modelsInitialized = false;
        return result;
    }

    return null;
};

module.exports = exports;
