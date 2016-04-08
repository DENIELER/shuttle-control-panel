var express = require('express');
var https = require('https');
var http = require('http');
var app = express();

app.use(express.static(__dirname));

app.set('view engine', 'ejs');

app.engine('html', require('ejs').renderFile);

var ip = getip();

app.set('views', __dirname + '/views');

app.get('/', function(req, res){

	res.render('index.ejs', { ip: ip[1] });
});

http.createServer(app).listen(8080);

function getip () {
	var
    // Local ip address that we're trying to calculate
    address = []
    // Provides a few basic operating-system related utility functions (built-in)
    ,os = require('os')
    // Network interfaces
    ,ifaces = os.networkInterfaces();

	// Iterate over interfaces ...
	for (var dev in ifaces) {

	    // ... and find the one that matches the criteria
	    var iface = ifaces[dev].filter(function(details) {
	        return details.family === 'IPv4' && details.internal === false;
	    });

	    if(iface.length > 0) {
	      address.push(iface[0].address);
	 	}
	}

	return address;
}