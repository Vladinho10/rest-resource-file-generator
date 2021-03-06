'use strict';
const { outputFile } = require('fs-extra');
const path = require('path');

const fileGenerators = require('../file-generators');
const rcFileDefault = require('../restrc.js');
const defaultBodies = require('../rest-resources');

module.exports = async function (name = '', fields, localRestrc, localBodies) {
    try {
        if (!name || /[^A-Za-z0-9-]/.test(name)) {
            throw new Error('invalid name');
        }
        const bodies = (localBodies && require(path.join(process.cwd(), 'rest-resources'))) || {};

        const restrc = localRestrc ? require(path.join(process.cwd(), 'restrc.js')) : rcFileDefault;
        const configs = restrc(name, { ...defaultBodies, ...bodies });

        for (const [generator, { fileName }] of Object.entries(configs)) {
            outputFile(fileName, fileGenerators[generator](configs, fields), { flag: 'wx' })
                .then()
                .catch(() => console.log(`${fileName} exists`));
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
