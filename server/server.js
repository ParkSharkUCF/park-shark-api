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

  Sensor.find({ id: id }).then((sensor) => {
    if (!sensor) {
      res.status(404).send();
    }

    res.status(200).send({sensor});
  }).catch((e) => {
    res.status(400).send();
  });
});

app.post('/sensor', (req, res) => {
  var body = _.pick(req.body, ['id', 'cars', 'lastUpdated']);
  var sensor = new Sensor(body);

  sensor.save().then((doc) => {
    res.status(200).send(doc);
  }).catch((e) => {
    res.status(400).send(e);
  });
});

app.patch('/sensor/:id', (req, res) => {
  var id = req.params.id;
  var body = _.pick(req.body, ['cars', 'lastUpdated']);

  Sensor.findOneAndUpdate({ id: id }, {$set: body}, {new: true}).then((sensor) => {
    if (!sensor) {
      return res.status(404).send();
    }

    res.status(200).send({sensor});
  }).catch((e) => {
    res.status(400).send();
  });
});

// deletes everything :o
app.delete('/sensor', (req, res) => {
  Sensor.remove({}).then(() => {
    res.status(200).send();
  });
});

app.listen(port, () => {
  console.log(`Started up at port ${port}`);
});

module.exports = {app};
