/**
 * Created by skaldo on 2/19/2015.
 */
var Measurement = require('../models/measurement');

var express = require('express');
var router = express.Router();

// Get all measurements
router.get('/', function(req, res){
    Measurement.find({},
        function(err, measurements){
            if(err) res.send(err);
            res.send(measurements);
        });
});

// Get measurements by id
router.get('/:id', function(req, res){
    Measurement.findById(req.params.id,
        function(err, measurements){
            if(err) res.send(err);
            res.send(measurements);
        });
});

module.exports = router;
