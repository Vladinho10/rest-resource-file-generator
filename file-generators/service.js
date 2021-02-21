'use strict';
const util = require('util');

module.exports = function ({ services, models = {} }) {
    const {
        PascalCaseName,
        variableName: service,
        modelsDir = '../dal/models',
        fileBody } = services;
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
