'use strict';
const { strings } = require('./helpers/general');

module.exports = function (resourceName) {
    const camelCaseName = strings.toCamelCase(resourceName);
    const PascalCaseName = strings.toPascalCase(camelCaseName);
    const options = {
        resourceName,
        camelCaseName,
        PascalCaseName,
        basePath: 'v1',
    };

    return {
        routers: {
            ...options,
            fileName: `routers/${resourceName}-rt.js`,
            variableName: `${camelCaseName}Rt`,
            controllersDir: '../controllers',
        },
        controllers: {
            ...options,
            fileName: `controllers/${resourceName}-ctrl.js`,
            variableName: `${PascalCaseName}Ctrl`,
            servicesDir: '../services',
        },
        services: {
            ...options,
            fileName: `services/${resourceName}-srv.js`,
            variableName: `${PascalCaseName}Srv`,
            modelsDir: '../dal/models',
            fileBody: `class %s {
    static async readOne() {

    }

    static async readMany() {

    }

    static async createOne() {

    }

    static async updateOne() {

    }

    static async removeOne() {

    }
}`,
        },
        models: {
            ...options,
            fileName: `dal/models/${resourceName}.js`,
            variableName: camelCaseName,
        },
        unitTests: {
            fileName: `tests/unit/${resourceName}-test.js`,
            controllersDir: '../controllers',
            variableName: PascalCaseName,
        },
        swaggerPaths: {
            ...options,
            fileName: `docs/swagger/paths/${resourceName}-path.json`,
        },
        swaggerSchemas: {
            fileName: `docs/swagger/schemas/${resourceName}-schema.json`,
        },
    };
};

