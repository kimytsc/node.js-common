/**
 * @file	Security.js
 * @brief	Security setup
 * @version	1.0
 * @author	김용태 (kimytsc@gmail.com)
 * 
 * https://www.slideshare.net/deepusnath/node-security-42338708
 * https://blog.risingstack.com/node-js-security-checklist/
 * https://blog.naver.com/cck223/220971892608
 */
'use strict'

const csrf = require('csurf');
const helmet = require('helmet');
const filter = require('content-filter');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

// Init
module.exports = (app) => {
	app.use(cookieParser());

	// post 값 파싱을 위한 설정 Start
	// http://new93helloworld.tistory.com/42
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({extended : true}));
	// post 값 파싱을 위한 설정 End

	// SQL Injection Start
	// 정규 표현식을 이용한 금지어 처리 
	// var optionsOfFilter = {
	// 	urlBlackList:['$ne','$','{','&&','||'],
	// 	urlMessage: 'A forbidden expression has been found in URL: ',
	// 	bodyBlackList:['$ne','$','{','&&','||'],
	// 	bodyMessage: 'A forbidden expression has been found in form data: ',
	// 	methodList:['POST', 'PUT', 'DELETE'],
	// 	dispatchToErrorHandler: true
	// } ;
	// app.use(filter(optionsOfFilter));
	// SQL Injection End

	if(typeof helmet != 'undefined'){
		app.use(helmet());
	}else{
		app.use(function (req, res, next) {
			res.removeHeader("X-Powered-By");
			next();
		});
	}
	// app.use(this.csrf);

	return this;
}
// console.log('--------------------------');
// console.log(myApp.get(__dirname));
exports.csrf = csrf({
	cookie: true,
	sessionKey: myApp.get(__dirname).session.name
});