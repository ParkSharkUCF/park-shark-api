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
  floor: {
    type: Number,
    default: 2
  },
  spots: {
    type: Array
  },
  cars: {
    type: Number,
    required: true
  },
  batLevel: {
    type: Number,
    default: 0
  },
  lastUpdated: {
    type: Number,
    default: null
  }
});

module.exports = {Sensor};
