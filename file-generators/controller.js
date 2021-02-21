'use strict';
const { strings } = require('../helpers/general');

module.exports = function (resourceName, { controllers, services = {} }) {
    const camelCaseName = strings.toCamelCase(resourceName);
    const PascalCaseName = strings.toPascalCase(camelCaseName);
    const { variableName: controller, servicesDir = '../services' } = controllers;
    const { variableName: service = `${PascalCaseName}Srv` } = services;

    return `'use strict';
const { ${service} } = require('${servicesDir}');

class ${controller} {
    static async getMany(req, res) {
        
    }

    static async getOne(req, res) {
        
    }

    static async post(req, res) {
        
    }

    static async putOne(req, res) {
        
    }

    static async deleteOne(req, res) {
        
    }
}

module.exports = {
    ${controller},
};
`;
};
