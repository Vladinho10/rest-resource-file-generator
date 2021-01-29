'use strict';
const { strings } = require('../helpers/general');

module.exports = function (resourceName = '', configs, fields = {}) {
    const mongooseSchema = JSON.stringify({ ...fields,
        created: { type: 'Date', default: Date.now }, updated: { type: 'Date', default: Date.now },
    }, null, 2);
    const pascalCaseName = strings.toPascalCase(resourceName);

    return `'use strict';
const mongoose = require('mongoose');
const { Schema } = mongoose;

const ${resourceName}Schema = new Schema(${mongooseSchema});

const ${pascalCaseName} = mongoose.model('${pascalCaseName}', ${resourceName}Schema);

module.exports = { ${pascalCaseName} };
`;
};
