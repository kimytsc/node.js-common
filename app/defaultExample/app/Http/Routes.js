/**
 * @file	routes.js
 * @brief	Controller mapping
 * @version	1.0
 * @author	김용태 (kimytsc@gmail.com)
 * @param	Express	app	Express 생성자
 */
'use strict';

const controller_mapping = (controller) => {
	controller = controller.split('@');
	return require(myApp.get(__dirname).controllerRoot + '/' + controller[0])[controller[1]]
}

module.exports = function(app){
	app.get('/', controller_mapping('Common/MainController@index'));
	app.get('/language/ko', controller_mapping('Common/LanguageController@ko'));
	app.get('/language/en', controller_mapping('Common/LanguageController@en'));

	// Example Start
	app.get('/jsonText', controller_mapping('ExampleController@jsonText'));
	app.get('/jsonObject', controller_mapping('ExampleController@jsonObject'));
	app.get('/getText', controller_mapping('ExampleController@getText'));
	app.get('/csrfForm', myApp.get(__dirname).middleware.Security.csrf, controller_mapping('ExampleController@csrfForm')); // CSRF example form
	app.post('/csrfProcessOff', controller_mapping('ExampleController@csrfProcess')); // CSRF-Off example
	app.post('/csrfProcessSuccess', myApp.get(__dirname).middleware.Security.csrf, controller_mapping('ExampleController@csrfProcess')); // CSRF-On example with Success
	app.post('/csrfProcessCustomError', myApp.get(__dirname).middleware.Security.csrf, controller_mapping('ExampleController@csrfProcess'), controller_mapping('ExampleController@csrfProcessCustomError')); // CSRF-On example with Custom Error
	app.post('/csrfProcessDefaultError', myApp.get(__dirname).middleware.Security.csrf, controller_mapping('ExampleController@csrfProcess')); // CSRF-On example with Default 500 Error
	// Example End

	// Default - 404 Not found
	app.use((req, res, next) => {
		res.status(404).render('404.html');
	});

	// Default - 500 Error
	app.use((err, req, res, next) => {
		res.status(500).render('500.html');
		console.log(err);
	});
};