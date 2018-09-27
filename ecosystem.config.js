/**
 * @file	ecosystem.config.js
 * @brief	ecosystem
 * @version	1.0
 * @author	김용태 (kimytsc@gmail.com)
 * 
 * https://massivcode.com/5
 * http://pm2.keymetrics.io/docs/usage/startup/
 * http://pm2.keymetrics.io/docs/usage/watch-and-restart/
 * http://hyper-cube.io/2018/04/21/pm2/
 * http://blog.msalt.net/225
 * https://blog.outsider.ne.kr/1197
 */
'use strict';

module.exports = {
	apps: [
		{
			name: "DYM-Logger", // pm2로 실행한 프로세스 목록에서 이 애플리케이션의 이름으로 지정될 문자열
			script: "./server.js", // pm2로 실행될 파일 경로
			watch: ["app", "conf", "utils"],
			ignore_watch : ["node_modules", "log"],
			watch_options: {
			  "followSymlinks": false
			},
			exec_mode: "cluster",
			instances: 0,
			env: {
				// 공통변수로 적용될 설정 지정
				NODE_APP_INSTANCE: '', // 값이 있으면, conf/default-{NODE_APP_INSTANCE}.js 파일을 읽어옴
				NODE_ENV: "development" // NODE_ENV=development (Default)
			},
			env_development: {
				// 로컬환경시 적용될 설정 지정
				NODE_ENV: "development"
			},
			env_staging: {
				// 개발환경시 적용될 설정 지정
				NODE_ENV: "staging"
			},
			env_production: {
				// 배포환경시 적용될 설정 지정
				NODE_ENV: "production"
			}
		}
	]
};