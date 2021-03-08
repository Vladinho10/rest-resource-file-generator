#!/usr/bin/env node

const create = require('../lib/create');
const generateSchema = require('../helpers/generate-schema');
const args = process.argv.slice(2);

let fileName = '';
let fields = {};
let localRestrc = false;
let localBodies = false;

const nameIndex = args.indexOf('-N');

if (nameIndex > -1) {
    fileName = args[nameIndex + 1];
}

const localRestrcIndex = args.indexOf('-LR');

if (localRestrcIndex > -1) {
    localRestrc = args[localRestrcIndex + 1] === 'yes';
}

const localBodiesIndex = args.indexOf('-LB');

if (localBodiesIndex > -1) {
    localBodies = args[localBodiesIndex + 1] === 'yes';
}

const fieldIndex = args.indexOf('-F');

if (fieldIndex > -1) {
    const fieldsArray = args.slice(fieldIndex + 1);
    fields = generateSchema(fieldsArray);
}

create(fileName, fields, localRestrc, localBodies);

