var express = require('express');
var https = require('https');
var http = require('http');
var app = express();

app.use(express.static(__dirname));

app.set('view engine', 'ejs');

app.engine('html', require('ejs').renderFile);

app.get('/', function(req, res){
  res.render('index.ejs', { ip: '192.168.0.101' });
});

http.createServer(app).listen(8080);
