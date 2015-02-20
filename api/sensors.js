/**
 * Created by skaldo on 2/19/2015.
 */
var Sensor = require('../models/sensor');
var LoggingUnit = require('../models/loggingUnit');

var express = require('express');
var router = express.Router();

// Get all sensors
router.get('/', function(req, res){
    Sensor.find({},
        function(err, sensors){
            if(err) res.send(err);
            res.send(sensors);
        });
});

// Get sensor by id(s)
router.get('/:id', function(req, res){
    Sensor.findById(req.params.id,
        function(err, sensor){
            if(err) res.send(err);
            res.send(sensor);
        });
});

// Get all sensor's measurements
router.get('/:id/measurements', function(req, res){
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
router.get('/:id/measurements/:from', function(req, res){
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
router.get('/:id/measurements/:from/:to', function(req, res){
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
