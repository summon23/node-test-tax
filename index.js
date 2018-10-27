'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const core = require('./method');
const config = require('./config');
const app = express();
 
const loadApplication = async function () {
    // Load Env File
    config.loadEnvironment();
    const PORT = process.env.PORT;

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({
        extended: true
    }));

    app.use(cors({
        origin: 'http://localhost:8080',
        credentials: true
    }));

    await core.registerMethod(app);

    app.use(function(req, res, next){
        res.status(404);
        res.send({ error: 'Url Not found' });
    });

    app.listen(PORT, () => {
        console.log(`running on ${PORT}`);
    });
};

loadApplication();