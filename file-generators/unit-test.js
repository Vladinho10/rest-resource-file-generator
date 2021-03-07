'use strict';
const pluralize = require('pluralize');
const { strings } = require('../helpers/general');

const defaultBody = require('../rest-resources/unit-test-body');

module.exports = function ({ unitTests = {} }) {
    const { resourceName, params, body } = unitTests;
    const camelCaseName = strings.toCamelCase(resourceName);
    const pascalCaseName = strings.toPascalCase(camelCaseName);
    const pluralizedName = pluralize.plural(resourceName);

    let fileBody = body || defaultBody;

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

    return fileBody;
};

