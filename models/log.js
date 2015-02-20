var mongoose = require('mongoose');

var logSchema = mongoose.Schema({
  string: String,
  date: Date
});

module.exports = mongoose.model('Log', logSchema);
