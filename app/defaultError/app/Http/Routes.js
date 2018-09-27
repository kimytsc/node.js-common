/**
 * @file	routes.js
 * @brief	Controller mapping
 * @version	1.0
 * @author	김용태 (kimytsc@gmail.com)
 * @param	Express	app	Express 생성자
 */
'use strict';

module.exports = function(app){
	// Default - 404 Not found
	app.use((req, res, next) => {
		res.status(404).render('404.html');
	});

	// Default - 500 Error
	app.use((err, req, res, next) => {
		res.status(500).render('500.html');
	});
};