'use strict';

module.exports = function (resourceName, bodies) {
    return {
        // routers: {
        //     resourceName,
        //     body: bodies.routerBody,
        //     fileName: `routers/${resourceName}-rt.js`,
        //     params: {
        //         dir: '../controllers',
        //         basePath: 'v1',
        //         routerName: 'camelCaseNameRt',
        //         controllerName: 'pascalCaseNameCtrl',
        //         pathName: 'pluralizedName',
        //     },
        // },
        // controllers: {
        //     ...options,
        //     fileName: `controllers/${resourceName}-ctrl.js`,
        //     variableName: `${PascalCaseName}Ctrl`,
        //     servicesDir: '../services',
        // },
        // services: {
        //     resourceName,
        //     body: bodies.serviceBody,
        //     fileName: `services/${resourceName}-srv.js`,
        //     params: {
        //         modelName: 'pascalCaseName',
        //         dir: '../dal/models',
        //         ServiceClassName: 'pascalCaseNameSrv',
        //     },
        // },
        // models: {
        //     resourceName,
        //     body: bodies.modelBody,
        //     fileName: `dal/models/${resourceName}.js`,
        //     params: { // find in string by variable name
        //         modelName: 'pascalCaseName',
        //         schemaName: 'camelCaseNameSchema',
        //     },
        // },
        // unitTests: {
        //     resourceName,
        //     body: bodies.unitTestBody,
        //     fileName: `tests/unit/${resourceName}-test.js`,
        //     params: {
        //         dir: '../controllers', // key and values must be different words
        //         controllerName: 'pascalCaseNameCtrl',
        //         testName: 'pascalCaseName',
        //     },
        // },
        swaggerPaths: {
            fileName: `docs/swagger/paths/${resourceName}-path.json`,
        },
        swaggerSchemas: {
            fileName: `docs/swagger/schemas/${resourceName}-schema.json`,
        },
    };
};

