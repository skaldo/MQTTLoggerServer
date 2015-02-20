var mongoose = require('mongoose');

var measurementSchema = mongoose.Schema({
  binary: String,
  string: String,
  int: Number,
  date: Date
});

module.exports = mongoose.model('Measurement', measurementSchema);
