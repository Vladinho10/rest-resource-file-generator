'use strict';
const { strings } = require('./helpers/general');

module.exports = function (resourceName) {
    const camelCaseName = strings.toCamelCase(resourceName);
    const PascalCaseName = strings.toPascalCase(camelCaseName);

    return {
        routers: {
            fileName: `routers/${resourceName}-rt.js`,
            variableName: `${camelCaseName}Rt`,
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
            fileName: `dal/models/${resourceName}.js`,
            variableName: `${camelCaseName}`,
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
            variableName: `${PascalCaseName}`,
        },
    };
};

