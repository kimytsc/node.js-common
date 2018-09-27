/**
 * @file	LanguageController.js
 * @brief	Controller mapping
 * @version	1.0
 * @author	김용태 (kimytsc@gmail.com)
 */
'use strict';

exports.ko = (req, res, next) => {
	res.cookie(myApp.get(__dirname).i18n.cookie, 'ko');
	res.redirect('back');
}

exports.en = (req, res, next) => {
	res.cookie(myApp.get(__dirname).i18n.cookie, 'en');
	res.redirect('back');
}