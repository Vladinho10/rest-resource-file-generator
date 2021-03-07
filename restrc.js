'use strict';
module.exports = function (resourceName, bodies) {
    return {
        routers: {
            resourceName,
            body: bodies.routerBody,
            fileName: `routers/${resourceName}-rt.js`,
            params: {
                dir: '../controllers',
                basePath: 'v1',
                routerName: 'camelCaseNameRt',
                controllerName: 'pascalCaseNameCtrl',
                pathName: 'pluralizedName',
            },
        },
        controllers: {
            resourceName,
            body: bodies.controllerBody,
            fileName: `controllers/${resourceName}-ctrl.js`,
            params: {
                dir: '../services',
                controllerName: 'pascalCaseNameCtrl',
                serviceName: 'pascalCaseNameSrv',
            },
        },
        services: {
            resourceName,
            body: bodies.serviceBody,
            fileName: `services/${resourceName}-srv.js`,
            params: {
                modelName: 'pascalCaseName',
                dir: '../dal/models',
                serviceName: 'pascalCaseNameSrv',
            },
        },
        models: {
            resourceName,
            body: bodies.modelBody,
            fileName: `dal/models/${resourceName}.js`,
            params: { // find in string by key name
                modelName: 'pascalCaseName',
                schemaName: 'camelCaseNameSchema',
            },
        },
        unitTests: {
            resourceName,
            body: bodies.unitTestBody,
            fileName: `tests/unit/${resourceName}-test.js`,
            params: {
                dir: '../controllers', // key and values contain be different words
                controllerName: 'pascalCaseNameCtrl',
                testName: 'pascalCaseName',
            },
        },
        swaggerPaths: {
            resourceName,
            fileName: `docs/swagger/paths/${resourceName}-path.json`,
            params: {
                basePath: 'v1',
                schemaName: 'camelCaseNameSchema',
                tagName: 'pascalCaseName',
                pathName: 'pluralizedName',
            },
        },
        swaggerSchemas: {
            fileName: `docs/swagger/schemas/${resourceName}-schema.json`,
        },
    };
};

