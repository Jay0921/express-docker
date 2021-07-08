var express = require('express');
var path = require('path');
var logger = require('morgan');
const redis = require('redis');

var app = express();

// Ths host name here must be the same as what you define in the docker-compose
const client = redis.createClient({
  host: 'redis',
  port: 6379
});
client.set('visits', 0);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));

app.get('/', (req, res) => {
  client.get('visits', (err, visits) => {
    res.send('Number of visits is ' + visits);
    client.set('visits', parseInt(visits) + 1);
  });
});

module.exports = app;
