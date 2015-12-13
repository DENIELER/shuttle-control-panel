console.log('Started shuttle-control-panel..');

var http = require('http');
var url = require('url');

var config = require('./config');

var app = require('./app');

console.log('PORT:' + config.PORT);

http.createServer(function (request, response) {

	try {
		var relative_path = url.parse(request.url).pathname;

		if (relative_path === '/next-song') {
			app.next_song(request, response);
		} else if (relative_path === '/prev-song') {
			app.prev_song(request, response);
		} else if (relative_path === '/pause-song') {
			app.pause_song(request, response);
		} else {
			response.writeHead(200, {'Content-Type': 'text/plain'});
			response.end();
		}
	} catch (e) {
		response.writeHead(500, {'Content-Type': 'text/plain'});
		response.end('Server Error');
	}

}).listen(config.PORT);

console.log('Server running at http://127.0.0.1:' + config.PORT + '/');