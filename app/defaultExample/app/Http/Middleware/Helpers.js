/**
 * @file	Heplers.js
 * @brief	helper functions
 * @version	1.0
 * @author	김용태 (kimytsc@gmail.com)
 */
'use strict'

// Init
module.exports = (app) => {
	for(var fname in this){
		if(this.hasOwnProperty(fname)){
			app.use(this[fname]);
		}
	}

	return this;
}

exports.requestTime = (req, res, next) => {
	req.requestTime = Date.now();
	next();
}

exports.location = (req, res, next) => {
	req.location = {
		href: (req.protocol + '://' + req.get('host') + (req.originalUrl || req.url)).split('/')
	}

	req.location.protocol = req.location.href[0];
	req.location.host = req.location.href[2].split(':');
	req.location.origin = req.location.href.slice(0, 3).join('/');
	req.location.search = req.location.href.slice(3, req.location.href.length).join('/').split('?');

	req.location.pathname = '/' + req.location.search[0];
	req.location.search[0] = req.location.search.length < 2 ? '' : '?';
	req.location.search = req.location.search.join('');

	req.location.hostname = req.location.host[0];
	req.location.port = req.location.host.length < 2 ? '' : req.location.host[1];

	req.location.host = req.location.host.join(':');
	req.location.href = req.location.href.join('/');
	next();
}