'use strict';
const pluralize = require('pluralize');
const { strings } = require('../helpers/general');

module.exports = function (name) {
    const camelCaseName = strings.toCamelCase(name);
    const pascalCaseName = strings.toPascalCase(camelCaseName);
    const pluralizedName = pluralize.plural(name);

    const paths = {
        [`${pluralizedName}`]: {
            get: {
                summary: 'Get many resources',
                tags: [`${pascalCaseName}`],
                parameters: [
                    {
                        in: 'query',
                        camelCaseName: 'limit',
                        description: 'this is limit',
                        required: false,
                        schema: {
                            type: 'integer',
                        },
                    },
                    {
                        in: 'query',
                        camelCaseName: 'offset',
                        description: 'this is offset',
                        required: false,
                        schema: {
                            type: 'string',
                        },
                    },
                    {
                        in: 'query',
                        camelCaseName: 'sort',
                        description: 'this is sort',
                        required: false,
                        schema: {
                            type: 'string',
                        },
                    },
                ],
                responses: {
                    200: {
                        description: 'Ok',
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: `#components/schemas/${camelCaseName}Schema`,
                                },
                            },
                        },
                    },
                },
            },
            post: {
                summary: 'Create a new resource',
                tags: [`${pascalCaseName}`],
                requestBody: {
                    required: true,
                    content: {
                        'application/json': {
                            schema: {
                                $ref: `#components/schemas/${camelCaseName}Schema`,
                            },
                        },
                    },
                },
                responses: {
                    201: {
                        description: 'Created',
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: `#components/schemas/${camelCaseName}Schema`,
                                },
                            },
                        },
                    },
                },
            },
            put: {
                summary: 'Update many resources',
                tags: [`${pascalCaseName}`],
                requestBody: {
                    required: true,
                    content: {
                        'application/json': {
                            schema: {
                                $ref: `#components/schemas/${camelCaseName}Schema`,
                            },
                        },
                    },
                },
                parameters: [
                    {
                        in: 'body',
                        camelCaseName: 'ids',
                        description: 'array of ids',
                        required: false,
                        schema: {
                            type: 'string',
                        },
                    },
                ],
                responses: {
                    202: {
                        description: 'Accepted',
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: `#components/schemas/${camelCaseName}Schema`,
                                },
                            },
                        },
                    },
                },
            },
            patch: {
                summary: 'Delete many resource',
                tags: [`${pascalCaseName}`],
                parameters: [
                    {
                        in: 'query',
                        camelCaseName: 'limit',
                        description: 'this is limit',
                        required: false,
                        schema: {
                            type: 'integer',
                        },
                    },
                ],
                responses: {
                    204: {
                        description: 'No content',
                    },
                },
            },
        },
        [`/${pluralizedName}/{_id}`]: {
            get: {
                summary: 'Get a resource by id',
                tags: [`${pascalCaseName}`],
                parameters: [
                    {
                        camelCaseName: '_id',
                        in: 'path',
                        description: 'resource\'s id',
                        required: true,
                        type: 'string',
                    },
                ],
                responses: {
                    200: {
                        description: 'Ok',
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: `#components/schemas/${camelCaseName}Schema`,
                                },
                            },
                        },
                    },
                },
            },
            put: {
                summary: 'update a resource by id',
                tags: [`${pascalCaseName}`],
                parameters: [
                    {
                        camelCaseName: '_id',
                        in: 'path',
                        description: 'resource\'s id',
                        required: true,
                        type: 'string',
                    },
                ],
                responses: {
                    202: {
                        description: 'Accepted',
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: `#components/schemas/${camelCaseName}Schema`,
                                },
                            },
                        },
                    },
                },
            },
            delete: {
                summary: 'delete a resource by id',
                tags: [`${pascalCaseName}`],
                parameters: [
                    {
                        camelCaseName: '_id',
                        in: 'path',
                        description: 'resource\'s id',
                        required: true,
                        type: 'string',
                    },
                ],
                responses: {
                    204: {
                        description: 'No content',
                    },
                },
            },
        },
    };

    return JSON.stringify(paths, null, 2);
};
