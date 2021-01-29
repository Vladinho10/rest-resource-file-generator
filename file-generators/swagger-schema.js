'use strict';
module.exports = function (name, configs, fields) {
    return JSON.stringify({ properties: fields }, null, 2);
};
