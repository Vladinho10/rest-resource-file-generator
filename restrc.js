'use strict';
const { strings } = require('./helpers/general');

module.exports = function (resourceName, bodies) {
    const camelCaseName = strings.toCamelCase(resourceName);
    const PascalCaseName = strings.toPascalCase(camelCaseName);

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
        // controllers: {
        //     ...options,
        //     fileName: `controllers/${resourceName}-ctrl.js`,
        //     variableName: `${PascalCaseName}Ctrl`,
        //     servicesDir: '../services',
        // },
        services: {
            resourceName,
            body: bodies.serviceBody,
            fileName: `services/${resourceName}-srv.js`,
            params: {
                model: PascalCaseName,
                dir: '../dal/models',
                ServiceClassName: `${PascalCaseName}Srv`,
            },
        },
        // models: {
        //     ...options,
        //     fileName: `dal/models/${resourceName}.js`,
        //     variableName: camelCaseName,
        // },
        // unitTests: {
        //     fileName: `tests/unit/${resourceName}-test.js`,
        //     controllersDir: '../controllers',
        //     variableName: PascalCaseName,
        // },
        // swaggerPaths: {
        //     ...options,
        //     fileName: `docs/swagger/paths/${resourceName}-path.json`,
        // },
        // swaggerSchemas: {
        //     fileName: `docs/swagger/schemas/${resourceName}-schema.json`,
        // },
    };
};

