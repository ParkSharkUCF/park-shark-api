var mongoose = require('mongoose');

var Garage = mongoose.model('Garage', {
  name: {
    type: String,
    required: true
  },
  sensors: {
    type: Array
  },
});

module.exports = {Garage};
