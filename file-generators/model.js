'use strict';
const { strings } = require('../helpers/general');

module.exports = function (resourceName = '', { models }, fields = {}) {
    const camelCaseName = strings.toCamelCase(resourceName);

    const mongooseSchema = JSON.stringify({ ...fields,
        created: { type: 'Date', default: Date.now }, updated: { type: 'Date', default: Date.now },
    }, null, 2);
    const { fileBody } = models;
    const pascalCaseName = strings.toPascalCase(camelCaseName);

    return `'use strict';
const mongoose = require('mongoose');
const { Schema } = mongoose;

const ${camelCaseName}Schema = new Schema(${mongooseSchema});

const ${pascalCaseName} = mongoose.model('${pascalCaseName}', ${camelCaseName}Schema);

module.exports = { ${pascalCaseName} };
`;
};
