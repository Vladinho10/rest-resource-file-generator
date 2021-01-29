'use strict';
const mongooseSupportedOptions = [
    'type',
    'required',
    'default',
    'index',
    'unique',
    'sparse',
    'lowercase',
    'uppercase',
    'trim',
    'minLength',
    'maxLength',
    'min',
    'max',
];
const mongooseSchemaTypes = [
    'String',
    'Number',
    'Date',
    'Buffer',
    'Boolean',
    'Map',
    'Schema.Types.Mixed',
    'Schema.Types.ObjectId',
    'Schema.Types.Decimal128',
];
const { objects } = require('./general');

module.exports = function (stringFields) {
    // rest-resource -N book -F title--type:string-minLength:10 year--type:Number-min:1900
    const fields = {};

    for (const stringField of stringFields) {
        const [name, body] = stringField.split('--');
        const schemaTypeOptions = body.split('-');
        fields[name] = {};

        for (const property of schemaTypeOptions) {
            const [key, value] = property.split(':');

            if (mongooseSupportedOptions.includes(key)) {
                const parsedValue = objects.jsonParser(value);

                if (key === 'type') {
                    fields[name][key] = mongooseSchemaTypes.find(i => i === value);
                } else {
                    fields[name][key] = typeof parsedValue === 'object' ? value : parsedValue;
                }
            }
        }
    }

    return fields;
};
