var mongoose = require('mongoose');

var Garage = mongoose.model('Garage', {
  name: {
    type: String,
    required: true,
    unique: true
  },
  enabled: {
    type: Number,
    default: 1
  }.
  sensors: {
    type: Array
  },
  totalSpots: {
    type: Number,
    default: 6
  }
});

module.exports = {Garage};
