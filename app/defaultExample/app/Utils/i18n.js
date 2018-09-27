/**
 * @file	i18n.js
 * @brief	Language Controller
 * @version	1.0
 * @author	김용태 (kimytsc@gmail.com)
 * 
 * https://www.npmjs.com/package/i18n
 * https://github.com/wonism/TIL/tree/master/back-end/nodejs/i18n
 */
'use strict';

const i18n = require('i18n');

module.exports = function(req, res, next) {
	i18n.configure(myApp.get(__dirname).i18n);
	i18n.init(req, res);
	return next()
};