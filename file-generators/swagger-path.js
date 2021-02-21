'use strict';
const pluralize = require('pluralize');

module.exports = function ({ swaggerPaths }) {
    const {
        resourceName,
        camelCaseName,
        PascalCaseName,
        basePath,
    } = swaggerPaths;

    const pluralizedName = pluralize.plural(resourceName);

    const paths = {
        [`${basePath}/${pluralizedName}`]: {
            get: {
                summary: 'Get many resources',
                tags: [`${PascalCaseName}`],
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
                                    $ref: `#components/schemas/${camelCaseName}Schema`,
                                },
                            },
                        },
                    },
                },
            },
            post: {
                summary: 'Create a new resource',
                tags: [`${PascalCaseName}`],
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
                tags: [`${PascalCaseName}`],
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
                                    $ref: `#components/schemas/${camelCaseName}Schema`,
                                },
                            },
                        },
                    },
                },
            },
            patch: {
                summary: 'Delete many resource',
                tags: [`${PascalCaseName}`],
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
                tags: [`${PascalCaseName}`],
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
                                    $ref: `#components/schemas/${camelCaseName}Schema`,
                                },
                            },
                        },
                    },
                },
            },
            put: {
                summary: 'update a resource by id',
                tags: [`${PascalCaseName}`],
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
                                    $ref: `#components/schemas/${camelCaseName}Schema`,
                                },
                            },
                        },
                    },
                },
            },
            delete: {
                summary: 'delete a resource by id',
                tags: [`${PascalCaseName}`],
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
