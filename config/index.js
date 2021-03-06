'use strict';

const fs = require('fs');
const path = require('path');
const DotEnv = require('dotenv');

exports.loadEnvironment = () => {
    var env = process.env.NODE_ENV || 'local';    
    let inferredEnv = 'local';

    if (env === 'prod') {
        inferredEnv = 'production';
    } else if (env === 'dev') {
        inferredEnv = 'development';
    } else if (env === 'test') {
        inferredEnv = 'local';
    } else if (env === 'uat') {
        inferredEnv = 'uat';
    }

    if (fs.existsSync(path.join(__dirname,'../environments', inferredEnv + '.env'))) {
        const loadedEnv = DotEnv.parse(fs.readFileSync(path.join(__dirname,'../environments', inferredEnv + '.env')));
        for (const key in loadedEnv) {
            process.env[key] = loadedEnv[key];
        }
    }
    
    process.env.NODE_ENV = inferredEnv;
    console.log('Loaded ENV: ' + process.env.NODE_ENV.toUpperCase());
}

module.exports = exports;