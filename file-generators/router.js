'use strict';
const pluralize = require('pluralize');

module.exports = function ({ routers = {}, controllers = {} }) {
    const {
        resourceName,
        PascalCaseName,
        variableName: router,
        controllersDir = '../controllers',
        basePath = 'v1',
    } = routers;
    const pluralizedName = pluralize.plural(resourceName);
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

