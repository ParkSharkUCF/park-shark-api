var express = require('express');
var bodyParser = require('body-parser');
var {ObjectID} = require('mongodb');

var {mongoose} = require('./db/mongoose');
var {Sensor} = require('./models/sensor')

var app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.get('/sensor', (req, res) => {
  Sensor.find().then((sensors) => {
    res.send({sensors});
  }).catch((e) => {
    res.status(400).send(e);
  });
});

app.post('/sensor', (req, res) => {
  var sensor = new Sensor({
    cars: req.body.cars
  });

  sensor.save().then((doc) => {
    res.status(200).send(doc);
  }).catch((e) => {
    res.status(400).send(e);
  });
});

app.listen(port, () => {
  console.log(`Started up at port ${port}`);
});

module.exports = {app};
