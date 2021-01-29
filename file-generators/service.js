'use strict';
const { strings } = require('../helpers/general');

module.exports = function (resourceName = '', { services, models = {} }) {
    const PascalCaseName = strings.toPascalCase(resourceName);
    const { variableName: service, modelsDir = '../dal/models' } = services;
    const { variableName: model = PascalCaseName } = models;

    return `'use strict';
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
};
