'use strict';
const { strings } = require('../helpers/general');
const util = require('util');

module.exports = function (resourceName = '', { services, models = {} }) {
    const camelCaseName = strings.toCamelCase(resourceName);
    const PascalCaseName = strings.toPascalCase(camelCaseName);
    const { variableName: service, modelsDir = '../dal/models', fileBody } = services;
    const { variableName: model = PascalCaseName } = models;

    const body = fileBody ? util.format(fileBody, service) : `'use strict';
const { ${model} } = require('${modelsDir}');

class ${service} {
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
}

module.exports = {
    ${service},
};
`;

    return body;
};
