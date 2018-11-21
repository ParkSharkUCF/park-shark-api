var mongoose = require('mongoose');

var Garage = mongoose.model('Garage', {
  name: {
    type: String,
    required: true,
    unique: true
  },
  sensors: {
    type: Array
  },
  totalSpots: {
    type: Number,
    default: 6
  }
});

module.exports = {Garage};
