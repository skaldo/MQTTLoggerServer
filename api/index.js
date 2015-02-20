/**
 * Created by skaldo on 2/19/2015.
 */
var sensors = require('./sensors');
var units = require('./units');
var measurements = require('./measurements');
//var logs = require('logs');
//var presences = require('presences');

var express = require('express');
var router = express.Router();

router.use('/sensors', sensors);
router.use('/units', units);
router.use('/measurements', measurements);
//router.use('/logs', logs);
//router.use('/presences', presences);

module.exports = router;
