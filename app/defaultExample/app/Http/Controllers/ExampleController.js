/**
 * @file	ExampleController.js
 * @brief	Controller mapping
 * @version	1.0
 * @author	김용태 (kimytsc@gmail.com)
 */
'use strict';

const fs = require('fs');

exports.csrfForm = (req, res, next) => {
	res.render('csrfForm.html', {
		csrfToken: req.csrfToken ? req.csrfToken() : ''
	});
}

exports.csrfProcess = (req, res, next) => {
	res.send('data is being processed');
}
exports.csrfProcessCustomError = (err, req, res, next) => {
	switch(err.code){
		case 'EBADCSRFTOKEN':
			break;
	}
	res.status(500).send('csrf error');
}

exports.jsonText = (req, res, next) => {
	fs.readFile(myApp.get(__dirname).appRoot + "/config/" + "application.json", 'utf8', function (err, data) {
		res.end(data);
	});
}

exports.jsonObject = (req, res, next) => {
	fs.readFile(myApp.get(__dirname).appRoot + "/config/" + "application.json", 'utf8', function (err, data) {
		var data = JSON.parse(data);
		res.status(200).json(data);
	});
}

exports.getText = (req, res, next) => {
	res.render('getText.html', {
		username: 'username'
	})
}