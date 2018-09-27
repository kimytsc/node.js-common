/**
 * @file	default.js
 * @brief	Default enviroment setup
 * @version	1.0
 * @author	김용태 (kimytsc@gmail.com)
 * 
 * http://hyper-cube.io/2018/04/21/pm2/
 * https://github.com/lorenwest/node-config/wiki/Configuration-Files
 */
'use strict';

const fs = require('fs');

var virtualHost = [],
	searchFolder = __dirname + '/vhost_' + process.env.NODE_ENV,
	searchFile = false;

fs.readdirSync(searchFolder).forEach(file => {
	searchFile = searchFolder + '/' + file;
	if(fs.lstatSync(searchFile).isDirectory()){
		// Directory
	}else{
		// File
		virtualHost.push(require(searchFile));
	}
});

module.exports = {
	version: "1.0.0",
	encoding: "UTF-8",
	language: "ko-KR",
	apps: {}, // app list
	http: {
		timeout: 2000,
		server: []
	},
	https: {
		timeout: 2000,
		server: [],
		opts: {
			// pfx: fs.readFileSync(__basedir + '/app/localhost.com.pfx'),
			// passphrase: '123!@#'
			cert: fs.readFileSync(__basedir + '/app/localhost.com.crt'),
			key: fs.readFileSync(__basedir + '/app/localhost.com.key')
		}
	},
	virtualHost: virtualHost,
	errorHost: {
		version: "1.0.0",
		encoding: "UTF-8",
		language: "ko-KR",
		session:{
			name : "dymErrorSessionName",
			secret: "@#@$MYSIGN#@$#$",
			resave: true,
			saveUninitialized: true,
			cookie: { maxAge: 60000 }
		},
		alias:[],
		HTTP_HOST: '',
		DOCUMENT_ROOT: __basedir + '/app/defaultError',
		SCRIPT_FILENAME: __basedir + '/app/defaultError/app',
		http: true,
		https: {
			// pfx: fs.readFileSync(__basedir + '/app/localhost.com.pfx'),
			// passphrase: '123!@#'
			cert: fs.readFileSync(__basedir + '/app/localhost.com.crt'),
			key: fs.readFileSync(__basedir + '/app/localhost.com.key')
		},
		i18n: {
			cookie: 'lang', // 쿠키의 이름 설정, 개발자가 자유롭게 이름 설정가능
			locales:['ko', 'en'], // 사용언어 설정 / 'de' 나 'ja' , 'fr' 등등 추가 가능
			fallbacks: { nl: 'ko' },
			defaultLocale: 'ko', // 기본 사용언어 설정
			directory: __basedir + '/app/defaultError/locales', // 사용언어에 대한 템플릿폴더 생성위치, 
			autoReload: true,
			updateFiles: false, // 잘못된 JSON property 를 사용할 경우, 자동으로 파일을 업데이트 하는데, 개인적으론 불편해서 false 로 설정하여 사용한다.
			queryParameter: 'lang', // query string 으로 lang 이 오면, 해당 값의 언어를 불러온다.
			objectNotation: true // 중첩된 property 의 값을 가져오기 위해 true 로 설정한다.
		},
		log: {
			mode: "combined",
			opts: {
				interval: "1d", // rotate daily
				path: __basedir + "/log/defaultError"
			},
			error: {
				file: "/error.log",
				statusCodes: [404, 500],
				skip: {
					statusCodes: [],
					urls: ["/favicon.ico"]
				},
			},
			access: {
				file: "/access.log",
				statusCodes: [],
				skip: {
					statusCodes: [404, 500],
					urls: ["/favicon.ico", "/robots.txt"]
				}
			},
			token: [
				{
					nm: 'date',
					fn: function(req, res, format){
						// 로그 기본 날짜가 GMT+0을 표시하기 때문에 한국시간으로 변경
						return Date.date('d/M/Y:H:i:s:z +0900')
					}
				},{
					nm: 'url',
					fn: function(req, res){
						return req.location.href
					}
				}
			]
		}
	}
}