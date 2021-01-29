'use strict';
module.exports = function (resourceName) {
    const PascalCaseName = resourceName[0].toUpperCase() + resourceName.slice(1);

    return {
        routers: {
            fileName: `routers/${resourceName}-rt.js`,
            variableName: `${resourceName}Rt`,
            controllersDir: '../controllers',
            basePath: 'v1',
        },
        controllers: {
            fileName: `controllers/${resourceName}-ctrl.js`,
            variableName: `${PascalCaseName}Ctrl`,
            servicesDir: '../services',
        },
        services: {
            fileName: `services/${resourceName}-srv.js`,
            variableName: `${PascalCaseName}Srv`,
            modelsDir: '../dal/models',
        },
        models: {
            fileName: `dal/models/${resourceName}.js`,
            variableName: `${PascalCaseName}`,
        },
        swaggerSchemas: {
            fileName: `docs/swagger/schemas/${resourceName}-schema.json`,
        },
        swaggerPaths: {
            fileName: `docs/swagger/paths/${resourceName}-path.json`,
        },
        unitTests: {
            fileName: `tests/unit/${resourceName}-test.js`,
            controllersDir: '../controllers',
        },
    };
};

