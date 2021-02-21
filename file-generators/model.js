'use strict';
module.exports = function ({ models }, fields = {}) {
    const mongooseSchema = JSON.stringify({ ...fields,
        created: { type: 'Date', default: Date.now }, updated: { type: 'Date', default: Date.now },
    }, null, 2);
    const {
        camelCaseName,
        PascalCaseName,
        fileBody,
    } = models;

    return `'use strict';
const mongoose = require('mongoose');
const { Schema } = mongoose;

const ${camelCaseName}Schema = new Schema(${mongooseSchema});

const ${PascalCaseName} = mongoose.model('${PascalCaseName}', ${camelCaseName}Schema);

module.exports = { ${PascalCaseName} };
`;
};
