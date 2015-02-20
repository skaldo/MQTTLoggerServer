/**
 * Created by skaldo on 2/15/2015.
 */
var fs = require('fs');

function parserFactory() {
    var self = this;

    self._protocols = {};

    var protocols = fs.readdirSync(__dirname);

    for (var i = 0; i < protocols.length; i++) {
        if (protocols[i] != 'index.js') {
            self._protocols[protocols[i]] = require(__dirname + '/' + protocols[i] + '/index.js');
        }
    }
};

parserFactory.prototype.parse = function (bus, address, data) {
    var self = this;

    if (!self._protocols[bus]) {
        console.log("Bus " + bus + " is unsupported.");
        return null;
    }

    return self._protocols[bus].parse(address, data);
};

module.exports = new parserFactory();