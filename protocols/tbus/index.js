/**
 * Created by skaldo on 2/15/2015.
 */
var fs = require('fs');

var parseDataFactory = function () {
    var self = this;

    self._devices = {};

    var devices = fs.readdirSync(__dirname + '/devices');

    for (var i = 0; i < devices.length; i++) {
        var device = require(__dirname + '/devices/' + devices[i]);
        self._devices[device.id] = device;
    }
};

parseDataFactory.prototype.parse = function(address, data){
    var self = this,
        id;

    address = new Buffer(address, 'hex');
    data = new Buffer(data, 'hex');

    id = address.readUInt8(0);

    if(!self._devices[id]){
        console.log("device with id:"+id+" is unsupported.");
        return null;
    }
    return self._devices[id].convertTo.int(data);
};

module.exports = new parseDataFactory();