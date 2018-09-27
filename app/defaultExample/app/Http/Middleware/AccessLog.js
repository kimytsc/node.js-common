/**
 * @file	AccessLog.js
 * @brief	Access Log Management
 * @version	1.0
 * @author	김용태 (kimytsc@gmail.com)
 * 
 * http://cinema4dr12.tistory.com/822
 * http://chan180.tistory.com/164
 * https://www.npmjs.com/package/morgan
 * https://www.npmjs.com/package/rotating-file-stream
 */
'use strict'

const requireNew = require('require-new');
const fs = require('fs');
const rfs = require('rotating-file-stream');

const morgan = requireNew('morgan');

const Log = myApp.get(__dirname).log;

Log.opts.path.substr(__basedir.length, Log.opts.path.length).split('/').forEach(function(path){
	if(path){
		Log.opts.path = Log.opts.path + '/' + path;
		fs.existsSync(Log.opts.path) || fs.mkdirSync(Log.opts.path);
	}else{
		Log.opts.path = __basedir;
	}
});

const errorLogStream = rfs(Log.error.file, Log.opts);
const accessLogStream = rfs(Log.access.file, Log.opts);

accessLogStream.on('error', function(err) {
    // here are reported blocking errors
    // once this event is emitted, the stream will be closed as well
});
 
accessLogStream.on('open', function(filename) {
    // no rotated file is open (emitted after each rotation as well)
    // filename: useful if immutable option is true
});
 
accessLogStream.on('removed', function(filename, number) {
    // rotation job removed the specified old rotated file
    // number == true, the file was removed to not exceed maxFiles
    // number == false, the file was removed to not exceed maxSize
});
 
accessLogStream.on('rotation', function() {
    // rotation job started
});
 
accessLogStream.on('rotated', function(filename) {
    // rotation job completed with success producing given filename
});
 
accessLogStream.on('warning', function(err) {
    // here are reported non blocking errors
});

// Init
module.exports = (app) => {
	if(Log.token && Log.token instanceof Array && Log.token.length){
		Log.token.forEach(function(token){
			morgan.token(token.nm, token.fn);
		});
	}

	app.use(morgan(Log.mode, {
		stream: accessLogStream,
		skip: function(req, res) {
			return	req.url.in_array(Log.access.skip.urls)
		}
	}));

	app.use(morgan(Log.mode, {
		stream: errorLogStream,
		skip: function(req, res) {
			return	(Log.error.statusCodes.length > 0 ? !res.statusCode.in_array(Log.error.statusCodes) : false) ||
					res.statusCode.in_array(Log.error.skip.statusCodes) ||
					req.url.in_array(Log.error.skip.urls)
		}
	}));

	return this;
}