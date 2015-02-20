/**
 * Created by skaldo on 2/15/2015.
 */
var app = require('express')();
var server = require('http').Server(app);
var socketIO = require('socket.io');
var mqtt = require('mqtt');

var dataParser = require(__dirname+'/protocols/index.js');
var config = require(__dirname+'/config.json');

var realtime = function(server){
    var io = socketIO(server);
    //var mqttClient = mqtt.createClient(config.mqttPort, config.mqttUrl);
    var mqttClient = mqtt.connect(config.mqttLongUrl);

    // subscribe for the data from the logging nodes
    mqttClient.subscribe('MLUs/+/data/#');

    // forward the data from the MQTT channel to the WS
    // the data format is always hex string
    mqttClient.on('message', function broadcastData(topic, data) {
        var topicDescriptor = {},
            topicArray = topic.split('/'),
            parsedData;

        topicDescriptor.nodeId   = topicArray[1];
        topicDescriptor.bus      = topicArray[3];
        topicDescriptor.busId    = topicArray[4];
        topicDescriptor.sensorId = topicArray[5];

        data = data.toString();

        // emit the raw message for node
        io.emit('raw/data/node/'+topicDescriptor.nodeId, data);
        // emit the raw message for the unique sensor identifier
        io.emit('raw/'+topic, data);

        parsedData = dataParser.parse(topicDescriptor.bus, topicDescriptor.sensorId, data);
        io.emit('data/node/'+topicDescriptor.nodeId, data);
        io.emit(topic, parsedData);
    });
};

module.exports = realtime;