'use strict';
const routers = require('./router');
const controllers = require('./controller');
const services = require('./service');
const models = require('./model');
const swaggerPaths = require('./swagger-path');
const swaggerSchemas = require('./swagger-schema');
const unitTests = require('./unit-test');

module.exports = {
    routers,
    controllers,
    services,
    models,
    swaggerPaths,
    swaggerSchemas,
    unitTests,
};
