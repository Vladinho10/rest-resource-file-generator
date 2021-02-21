'use strict';
const pluralize = require('pluralize');
const { strings } = require('../helpers/general');

module.exports = function (resourceName, { routers = {}, controllers = {} }) {
    const pluralizedName = pluralize.plural(resourceName);
    const camelCaseName = strings.toCamelCase(resourceName);
    const PascalCaseName = strings.toPascalCase(camelCaseName);
    const { variableName: router, controllersDir = '../controllers', basePath = 'v1' } = routers;
    const { variableName: controller = `${PascalCaseName}Ctrl` } = controllers;

    return `'use strict';
const ${router} = require('express').Router();

const { ${controller} } = require('${controllersDir}');

${router}.get('/${basePath}/${pluralizedName}/:_id', ${controller}.getOne);
${router}.get('/${basePath}/${pluralizedName}', ${controller}.getMany);
${router}.post('/${basePath}/${pluralizedName}', ${controller}.post);
${router}.put('/${basePath}/${pluralizedName}/:_id', ${controller}.putOne);
${router}.delete('/${basePath}/${pluralizedName}/:_id', ${controller}.deleteOne);

module.exports = ${router};
`;
};

