var mongoose = require('mongoose');

var Sensor = mongoose.model('Sensor', {
  id: {
    type: Number,
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
