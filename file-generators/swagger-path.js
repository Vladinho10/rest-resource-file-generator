'use strict';
const pluralize = require('pluralize');
const { strings } = require('../helpers/general');

module.exports = function (name) {
    const pascalCaseName = strings.toPascalCase(name);
    const pluralizedName = pluralize.plural(name);

    const paths = {
        [`${pluralizedName}`]: {
            get: {
                summary: 'Get many resources',
                tags: [`${pascalCaseName}`],
                parameters: [
                    {
                        in: 'query',
                        name: 'limit',
                        description: 'this is limit',
                        required: false,
                        schema: {
                            type: 'integer',
                        },
                    },
                    {
                        in: 'query',
                        name: 'offset',
                        description: 'this is offset',
                        required: false,
                        schema: {
                            type: 'string',
                        },
                    },
                    {
                        in: 'query',
                        name: 'sort',
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
                                    $ref: `#components/schemas/${name}Schema`,
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
                                $ref: `#components/schemas/${name}Schema`,
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
                                    $ref: `#components/schemas/${name}Schema`,
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
                                $ref: `#components/schemas/${name}Schema`,
                            },
                        },
                    },
                },
                parameters: [
                    {
                        in: 'body',
                        name: 'ids',
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
                                    $ref: `#components/schemas/${name}Schema`,
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
                        name: 'limit',
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
                        name: '_id',
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
                                    $ref: `#components/schemas/${name}Schema`,
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
                        name: '_id',
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
                                    $ref: `#components/schemas/${name}Schema`,
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
                        name: '_id',
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
