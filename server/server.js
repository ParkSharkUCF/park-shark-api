const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');

var {mongoose} = require('./db/mongoose');
var {Sensor} = require('./models/sensor');
var {Garage} = require('./models/garage');

var app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


app.get('/garage', (req, res) => {
  Garage.find().then((garages) => {
    res.send({garages});
  }).catch((e) => {
    res.status(400).send(e);
  });
});

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

app.post('/garage', (req, res) => {
  var body = _.pick(req.body, ['name', 'sensors', 'totalSpots']);
  var garage = new Garage(body);

  garage.save().then((doc) => {
    res.status(200).send(doc);
  }).catch((e) => {
    res.status(400).send(e);
  });
});

app.get('/garage/:name', (req, res) => {
  var name = req.params.name;

  Garage.find({ name: name }).then((garage) => {
    if (!garage) {
      res.status(404).send();
    }

    res.status(200).send({garage});
  }).catch((e) => {
    res.status(400).send(e);
  });
});

app.post('/sensor', (req, res) => {
  var body = _.pick(req.body, ['id', 'garage', 'cars', 'lastUpdated', 'spots']);
  var sensor = new Sensor(body);

  Garage.findOneAndUpdate({ name: body['garage']}, { $addToSet: { sensors: body['id']} }, {new: true}).then((garage) => {
    if (!garage) {
      var garage = new Garage({ name: body['garage'], sensors: [body['id']] });
      garage.save();
    }
  }).catch((e) => {
    res.status(400).send();
  });

  sensor.save().then((doc) => {
    res.status(200).send(doc);
  }).catch((e) => {
    res.status(400).send(e);
  });
});

app.patch('/sensor/:id', (req, res) => {
  var id = req.params.id;
  var body = _.pick(req.body, ['cars', 'lastUpdated', 'spots']);

  Sensor.findOneAndUpdate({ id: id }, {$set: body}, {new: true}).then((sensor) => {
    if (!sensor) {
      return res.status(404).send();
    }

    res.status(200).send({sensor});
  }).catch((e) => {
    res.status(400).send();
  });
});

app.patch('/garage/:name', (req, res) => {
  var name = req.params.name;
  var body = _.pick(req.body, ['sensors', 'totalSpots']);

  Garage.findOneAndUpdate({ name: name}, {$set: body}, {new: true}).then((garage) => {
    if (!garage) {
      return res.status(404).send();
    }

    res.status(200).send({garage});
  }).catch((e) => {
    res.status(400).send();
  });
});

// these delete everything :o
app.delete('/sensor', (req, res) => {
  Sensor.remove({}).then(() => {
    res.status(200).send();
  });
});

app.delete('/garage', (req, res) => {
  Garage.remove({}).then(() => {
      res.status(200).send();
  });
});

app.listen(port, () => {
  console.log(`Started up at port ${port}`);
});

module.exports = {app};
