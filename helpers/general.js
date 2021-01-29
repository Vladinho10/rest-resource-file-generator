/* eslint-disable no-empty */
'use strict';
const isEmptyObject = obj => typeof obj === 'object'
    && Object.keys(obj).length === 0
    && obj.constructor === Object;

const jsonParser = jsonString => {
    let data = {};

    try {
        data = JSON.parse(jsonString);
    } catch (err) {}

    return data;
};

const objects = {
    isEmptyObject,
    jsonParser,
};

const isUppercase = str => /^[A-Z]/.test(str);

const toPascalCase = str => str[0].toUpperCase() + str.slice(1);

const strings = {
    isUppercase,
    toPascalCase,
};

module.exports = { objects, strings };
