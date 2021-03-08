'use strict';
const pluralize = require('pluralize');
const { strings } = require('../helpers/general');

module.exports = function (restrcKey, restrcValue, fields) {
    const defaultBody = require(`../resource-bodies/${restrcKey}`);

    const stringifiedSchemaObject = JSON.stringify({ ...fields,
        created: { type: 'Date', default: Date.now }, updated: { type: 'Date', default: Date.now },
    }, null, 2);

    const { resourceName = '', params, body } = restrcValue;
    const camelCaseName = strings.toCamelCase(resourceName);
    const pascalCaseName = strings.toPascalCase(camelCaseName);
    const pluralizedName = pluralize.plural(resourceName);

    let fileBody = body || defaultBody;

    if (fileBody === '') {
        fileBody = JSON.stringify({ properties: fields }, null, 2);
    }

    if (typeof fileBody === 'object') {
        fileBody = JSON.stringify(fileBody, null, 2);
    }

    for (const key in params) {
        if (params[key].includes('camelCaseName')) {
            params[key] = params[key].replace('camelCaseName', camelCaseName);
        }

        if (params[key].includes('pascalCaseName')) {
            params[key] = params[key].replace('pascalCaseName', pascalCaseName);
        }

        if (params[key].includes('pluralizedName')) {
            params[key] = params[key].replace('pluralizedName', pluralizedName);
        }

        const re = new RegExp(key, 'g');
        fileBody = fileBody.replace(re, params[key]);
    }

    fileBody = fileBody.replace('stringifiedSchemaObject', stringifiedSchemaObject);

    return fileBody;
};

