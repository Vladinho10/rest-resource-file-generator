'use strict';
module.exports = function (configs, fields) {
    return JSON.stringify({ properties: fields }, null, 2);
};
