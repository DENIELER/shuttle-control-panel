var Service = require('node-windows').Service;
var path = require('path');

var filename = 'shuttle-start.js';
var file = path.join(__dirname, filename);

console.log(file);

// Create a new service object
var svc = new Service({
	name:'Shuttle-Control-Panel',
	description: 'Shuttle control panel',
	script: file
});

svc.on('install', function(){
	svc.start();
});

svc.install();

//-------

var ss_filename = 'server.js';
var ss_file = path.join(__dirname, 'control-site', ss_filename);

var svc_siteServer = new Service({
	name:'Shuttle-Control-Panel-site-server',
	description: 'Shuttle control panel site server',
	script: ss_file
});

svc_siteServer.on('install', function(){
	svc_siteServer.start();
});

svc_siteServer.install();