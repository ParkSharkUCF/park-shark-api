var mongoose = require('mongoose');

var Sensor = mongoose.model('Sensor', {
  cars: {
    type: "number",
    required: true,
  },
  lastUpdated: {
    type: Number,
    default: null
  }
});

module.exports = {Sensor};
