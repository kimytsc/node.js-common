/**
 * @file	server.js
 * @brief	Application Main
 * @version	1.0
 * @author	김용태 (kimytsc@gmail.com)
 */
'use strict'

const express = require('express');
const app = express();

myApp.set(__dirname, (function(appRoot){
	return {
		appRoot: appRoot, // Root pathname setup
		middlewareRoot: appRoot + '/app/Http/Middleware', // Middleware pathname setup
		controllerRoot: appRoot + '/app/Http/Controllers', // Controller pathname setup
		modelRoot: appRoot + '/app/Model', // Model pathname setup
		utilsRoot: appRoot + '/app/Utils', // Utils pathname setup
		viewsRoot: appRoot + '/views', // Views pathname setup
		documentRoot: appRoot + '/public', // Document Root pathname setup
	}
})(__dirname));

const extLoader = require(myApp.get(__dirname).utilsRoot + '/extLoader');
extLoader(myApp.get(__dirname).middlewareRoot, ['.js']).forEach(function(element){myApp.set(__dirname, {middleware:{[element.parsePathname().name]: require(element)(app)}})}); // Middleware setup

// Language setup Start
const i18n = require(myApp.get(__dirname).utilsRoot + '/i18n');
app.use(i18n);
// Language setup End

// View engine setup Start
app.set('views', myApp.get(__dirname).viewsRoot);
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);
app.use(express.static(myApp.get(__dirname).documentRoot));
// View engine setup End

require(myApp.get(__dirname).appRoot + '/app/Http/Routes')(app); // Routes setup

module.exports = app;