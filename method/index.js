'use strict';

const DB = require('../modules/Database');
const path = require('path');
const routes = require('./routes');

exports.registerMethod = async (app) => {
    await DB.getContext();

    const methodName = [
        {
            uri: '/product',
            path: 'product'
        }
    ];

     /*** To Register new Method use this pattern
    {
        uri: '/new url slug',
        path: 'directory name for the folder'
    }
    ***/

    for (let i=0; i < methodName.length;i++) {
        const method = methodName[i];
        const allMethod = routes.genRoute(path.join(__dirname, './',method.path));
        app.use(method.uri, allMethod);
    }

    // app.use(function(req, res, next){
    //     res.status(404);
    //     res.send({ error: 'Url Not found' });
    // });
}

module.exports = exports;
