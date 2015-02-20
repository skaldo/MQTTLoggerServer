var mongoose = require('mongoose');

var unitSchema = mongoose.Schema({
    id: { type: Number , unique: true },
    name: String,
    description: String,
    location: String,
    logs: [{type: mongoose.Schema.Types.ObjectId, ref: 'Log'}],
    presences: [{type: mongoose.Schema.Types.ObjectId, ref: 'Presence'}],
    sensors: [{type: mongoose.Schema.Types.ObjectId, ref: 'Sensor'}]
});

module.exports = mongoose.model('LoggingUnit', unitSchema);
