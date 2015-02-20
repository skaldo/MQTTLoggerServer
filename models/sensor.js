var mongoose = require('mongoose');

var sensorSchema = mongoose.Schema({
    address: String,
    description: String,
    bus: String,
    busId: Number,
    unit: String,
    loggingUnit: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'LoggingUnit'
    },
    location: String,
    measurements: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Measurement'
    }]
});

module.exports = mongoose.model('Sensor', sensorSchema);
