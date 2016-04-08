var express = require('express');
var https = require('https');
var http = require('http');
var app = express();

app.use(express.static(__dirname));

app.set('view engine', 'ejs');

app.engine('html', require('ejs').renderFile);

app.set('views', __dirname + '/views');

app.get('/', function(req, res){

	var ip = req.headers['x-forwarded-for'] || 
	     req.connection.remoteAddress || 
	     req.socket.remoteAddress ||
	     req.connection.socket.remoteAddress;

	var ipArr = ip.split(':');

  	res.render('index.ejs', { ip: ipArr[ipArr.length - 1] });
});

http.createServer(app).listen(8080);
