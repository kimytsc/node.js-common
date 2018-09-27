/**
 * @file	server.js
 * @brief	Server Controller
 * @version	1.0
 * @author	김용태 (kimytsc@gmail.com)
 * 
 * https://nodejs.org/api/http.html#http_server_timeout
 * https://www.npmjs.com/package/vhttps
 * https://stackoverflow.com/questions/36462396/multiple-certificates-vhosts-with-express
 */
'use strict';

global.__basedir = __dirname;
process.env.NODE_CONFIG_DIR = __basedir + "/conf/";
const config = require('config');

const https = require('https');
const vhost = require('vhost');
const vhttps = require('vhttps');
const express = require('express');

require(__basedir + '/utils/prototype'); // Prototype setup

global.myApp = require(__basedir + '/utils/myApp');

// Error page setup Start
if(config.errorHost){
	myApp.set(config.errorHost.DOCUMENT_ROOT, config.errorHost);
	config.apps.defaultError = require(config.errorHost.SCRIPT_FILENAME);
}
// Error page setup End

config.virtualHost.forEach(function($_SERVER){
	myApp.set($_SERVER.DOCUMENT_ROOT, $_SERVER);
	config.apps[$_SERVER.SCRIPT_FILENAME] = require($_SERVER.SCRIPT_FILENAME);

	if($_SERVER.http && $_SERVER.http.port){
		config.http.server[$_SERVER.http.port] = config.http.server[$_SERVER.http.port] || [];
		config.http.server[$_SERVER.http.port].push($_SERVER);
	};

	if($_SERVER.https && $_SERVER.https.port){
		config.https.server[$_SERVER.https.port] = config.https.server[$_SERVER.https.port] || [];
		config.https.server[$_SERVER.https.port].push($_SERVER);
	}
});

config.http.server.forEach(function(apps, port){
	const inServer = express();

	apps.forEach(function($_SERVER){
		$_SERVER.HTTP_HOSTS.forEach(function(hostname){
			inServer.use(vhost(hostname, config.apps[$_SERVER.SCRIPT_FILENAME]));
		});
	});
	inServer.use(config.apps.defaultError);

	inServer.timeout = config.http.timeout;
	inServer.listen(port);
});

config.https.server.forEach(function(apps, port){
	const inServer = vhttps.init();
	inServer.setOptions(config.https.opts); // Set HTTPS options (with default certificate)

	apps.forEach(function($_SERVER){
		$_SERVER.HTTPS_HOSTS.forEach(function(hostname){
			inServer.use(hostname, $_SERVER.https.opts, config.apps[$_SERVER.SCRIPT_FILENAME]);
		});
	});
	inServer.use(config.apps.defaultError);

	inServer.timeout = config.https.timeout;
	inServer.listen(port);
});