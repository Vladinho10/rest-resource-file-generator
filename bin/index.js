#!/usr/bin/env node

const create = require('../lib/create');
const generateSchema = require('../helpers/generate-schema');
const args = process.argv.slice(2);

let fileName = '';
let fields = {};
let localRestrc = false;

const nameIndex = args.indexOf('-N');

if (nameIndex > -1) {
    fileName = args[nameIndex + 1];
}

const restrcIndex = args.indexOf('-LR');

if (restrcIndex > -1) {
    localRestrc = args[restrcIndex + 1] === 'yes';
}

const fieldIndex = args.indexOf('-F');

if (fieldIndex > -1) {
    const fieldsArray = args.slice(fieldIndex + 1);
    fields = generateSchema(fieldsArray);
}

create(fileName, fields, localRestrc);

