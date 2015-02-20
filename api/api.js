var Sensor = require('../models/sensor');
var Measurement = require('../models/measurement');
var LoggingUnit = require('../models/loggingUnit');
var Log = require('../models/log');
var Presence = require('../models/presence');

var express = require('express');
var router = express.Router();

// Get logging unit by ID
router.get('/units/:id', function(req, res){
    LoggingUnit.findOne({
        id: req.params.id
    }, function(err, loggingUnit){
        if(err) res.send(err);
        res.send(loggingUnit);
    });
});

// Get all logging units
router.get('/units', function(req, res){
    LoggingUnit.find({},
        function(err, loggingUnits){
            if(err) res.send(err);
            res.send(loggingUnits);
        });
});

// Get all sensors
router.get('/sensors', function(req, res){
    Sensor.find({},
        function(err, sensors){
            if(err) res.send(err);
            res.send(sensors);
        });
});

// Get sensor by id
router.get('/sensors/:id', function(req, res){
    Sensor.findById(req.params.id,
        function(err, sensor){
            if(err) res.send(err);
            res.send(sensor);
        });
});

// Get all sensor's measurements
router.get('/sensors/:id/measurements', function(req, res){
    Sensor.findById(req.params.id,
        function(err, sensor){
            if(err) res.send(err);
            Sensor.populate(sensor, {path: 'measurements'}, function(err, sensor) {
                if (err) res.send(err);
                res.send(sensor.measurements);
            });
        });
});

// Get some sensor's measurements
router.get('/sensors/:id/measurements/:from', function(req, res){
    var from = new Date(req.params.from);

    if(isNaN(from.getTime())){
        res.status(400).send({ error: 'Invalid date parameter.' });
    }

    var opts = [{ path: 'measurements', match: {
        date: { $gte: from }
    }}];

    Sensor.findById(req.params.id,
        function(err, sensor){
            if(err) res.send(err);
            Sensor.populate(sensor, opts, function(err, sensor) {
                if (err) res.send(err);
                res.send(sensor.measurements);
            });
        });
});

// Get some sensor's measurements
router.get('/sensors/:id/measurements/:from/:to', function(req, res){
    var from = new Date(req.params.from),
        to = new Date(req.params.to);

    if(isNaN(from.getTime())||isNaN(to.getTime())){
        res.status(400).send({ error: 'Invalid date parameters.' });
    }

    var opts = [{ path: 'measurements', match: {
        date: { $gte: from, $lte: to }
    }}];

    Sensor.findById(req.params.id,
        function(err, sensor){
            if(err) res.send(err);
            Sensor.populate(sensor, opts, function(err, sensor) {
                if (err) res.send(err);
                res.send(sensor.measurements);
            });
        });
});

module.exports = router;
