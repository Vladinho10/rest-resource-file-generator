'use strict';
const { outputFile } = require('fs-extra');
const path = require('path');

const fileGenerators = require('../file-generators');
const rcFileDefault = require('../restrc.js');

module.exports = async function (name = '', fields, localRestrc) {
    try {
        if (!name || /\W/.test(name)) {
            throw new Error('invalid name');
        }

        const resourceName = name.toLowerCase();
        const configs = localRestrc
            ? require(path.join(process.cwd(), 'restrc.js'))(resourceName)
            : rcFileDefault(resourceName);

        for (const [generator, { fileName }] of Object.entries(configs)) {
            outputFile(fileName, fileGenerators[generator](resourceName, configs, fields), { flag: 'wx' })
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
