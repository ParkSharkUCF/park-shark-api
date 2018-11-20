var mongoose = require('mongoose');

var Sensor = mongoose.model('Sensor', {
  id: {
    type: String,
    required: true
  },
  garage: {
    type: String,
    required: true
  },
  cars: {
    type: Number,
    required: true
  },
  lastUpdated: {
    type: Number,
    default: null
  }
});

module.exports = {Sensor};
