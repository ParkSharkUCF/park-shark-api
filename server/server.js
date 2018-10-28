const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');

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

app.get('/sensor/:id', (req, res) => {
  var id = req.params.id;

  if (!ObjectID.isValid(id)) {
    res.status(404).send();
  }

  Sensor.findById(id).then((sensor) => {
    if (!sensor) {
      res.status(404).send();
    }

    res.status(200).send({sensor});
  }).catch((e) => {
    res.status(400).send();
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

app.patch('/sensor/:id', (req, res) => {
  var id = req.params.id;
  var body = _.pick(req.body, ['cars', 'lastUpdated']);

  if (!ObjectID.isValid(id)) {
    return res.statis(404).send();
  }

  Sensor.findByIdAndUpdate(id, {$set: body}, {new: true}).then((sensor) => {
    if(!sensor) {
      return res.status(404).send();
    }

    res.status(200).send({sensor});
  }).catch((e) => {
    res.status(400).send();
  });
});

app.listen(port, () => {
  console.log(`Started up at port ${port}`);
});

module.exports = {app};
