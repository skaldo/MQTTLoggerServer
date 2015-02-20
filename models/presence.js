var mongoose = require('mongoose');

var presenceSchema = mongoose.Schema({
  info: String,
  date: Date
});

module.exports = mongoose.model('Presence', presenceSchema);
