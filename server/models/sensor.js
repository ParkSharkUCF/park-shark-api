var mongoose = require('mongoose');

var Sensor = mongoose.model('Sensor', {
  id: {
    type: String,
    required: true,
    unique: true
  },
  garage: {
    type: String,
    required: true
  },
  spots: {
    type: Array
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
