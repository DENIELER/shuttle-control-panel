var app = {
	next_song: function (req, res) {
		console.log('Action: NEXT_SONG');

		res.writeHead(200, {'Content-Type': 'text/plain'});
		res.end();
	},

	prev_song: function (req, res) {
		console.log('Action: PREV_SONG');

		res.writeHead(200, {'Content-Type': 'text/plain'});
		res.end();
	},

	pause_song: function (req, res) {
		console.log('Action: PAUSE_SONG');

		res.writeHead(200, {'Content-Type': 'text/plain'});
		res.end();
	}
};

module.exports = app;