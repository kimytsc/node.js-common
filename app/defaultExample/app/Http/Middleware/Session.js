/**
 * @file	Session.js
 * @brief	Session Management
 * @version	1.0
 * @author	김용태 (kimytsc@gmail.com)
 * 
 * https://blog.risingstack.com/node-js-security-checklist/
 */
'use strict'

const session = require('express-session');
// {
// 	name : 'dymLoggerSessionID',
// 	secret: '@#@$MYSIGN#@$#$', // 쿠키를 임의로 변조하는것을 방지하기 위한 sign 값 입니다. 원하는 값을 넣으면 됩니다.
// 	resave: false, // 세션을 언제나 저장할 지 (변경되지 않아도) 정하는 값입니다. express-session documentation에서는 이 값을 false 로 하는것을 권장하고 필요에 따라 true로 설정합니다.
// 	saveUninitialized: true // uninitialized 세션이란 새로 생겼지만 변경되지 않은 세션을 의미합니다. Documentation에서 이 값을 true로 설정하는것을 권장합니다.
// }

// Init
module.exports = (app) => {
	app.set('trust proxy', 1) // trust first proxy
	app.use(session(myApp.get(__dirname).session));

	return this;
}