'use strict';
const { outputFile } = require('fs-extra');
const path = require('path');

const fileGenerator = require('./file-generator');
const rcFileDefault = require('../restrc.js');
const defaultBodies = require('../resource-bodies');

module.exports = async function (name = '', fields, localRestrc, localBodies) {
    try {
        if (!name || /[^A-Za-z0-9-]/.test(name)) {
            throw new Error('invalid name');
        }
        const bodies = (localBodies && require(path.join(process.cwd(), 'resource-bodies/index.js'))) || {};
        const restrcFunction = localRestrc ? require(path.join(process.cwd(), 'restrc.js')) : rcFileDefault;
        const restrcObject = restrcFunction(name, { ...defaultBodies, ...bodies });

        for (const [key, value] of Object.entries(restrcObject)) {
            outputFile(value.fileName, fileGenerator(key, value, fields), { flag: 'wx' })
                .then()
                .catch(() => console.log(`${value.fileName} exists`));
        }

        console.log('resource created');
    } catch (err) {
        if (err.message.includes('Cannot find module')) {
            console.error('if -LR flag is set `yes`, then local restrc.js is required');
        } else {
            console.error(err.message);
        }
    }
};
