/**
 * Created by skaldo on 2/19/2015.
 */
var LoggingUnit = require('../models/loggingUnit');

var express = require('express');
var router = express.Router();

// Get all logging units
router.get('/', function(req, res){
    LoggingUnit.find({},
        function(err, loggingUnits){
            if(err) res.send(err);
            res.send(loggingUnits);
        });
});

// Get logging unit by ID
router.get('/:id', function(req, res){
    LoggingUnit.findOne({
        id: req.params.id
    }, function(err, loggingUnit){
        if(err) res.send(err);
        res.send(loggingUnit);
    });
});

module.exports = router;
