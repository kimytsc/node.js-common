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
 * https://futurestud.io/tutorials/pm2-advanced-app-configuration-with-json-file
 */
'use strict';

// name: application name, e.g. "blog"
// cwd: app location from where it will be launched, e.g. "/blog"
// args: additional arguments passed to your app, e.g. ["testing"]
// script: the script which will be executed to start an app, e.g. "/blog/app.js,
// node_args: additional Node.js arguments when launching your app, e.g. ["--harmony", " --max-stack-size=102400000"]
// timestamp: format of dates in your log files, e.g. "YYYY-MM-DD HH:mm Z"
// error_file: location of your apps error log file, e.g. "logs/blog.stderr.log"
// out_file: location of your apps out log file, e.g. "logs/blog.stdout.log"
// pid_file: location of your apps .pid file, e.g. "pids/blog.pid"
// instances: number of worker processes for your app. Allowed values: positive integer including 0 or 'max'
// min_uptime: minimum uptime before PM2 starts to restart an app in case of errors, e.g. "20s" (20 seconds), default value is 1s
// max_restarts: maximum restart count before PM2 gives up to get your app online, e.g. 10, default value is 15
// max_memory_restart: maximum memory amount before PM2 restarts your app, e.g. "100M" (100 megabytes), allowed values: "1G", "50M", "4K"
// cron_restart: cronjob pattern to restart your app, e.g. `"0 1 * * *",
// watch: watch the app folder for file changes in restart the app if a change is detected, default value is false, allowed values are true|false
// ignore_watch: regex list of files or folders to be ignored when watching an app, e.g. ["[\\/\\\\]\\./", "node_modules"]
// merge_logs: defines whether the logs of all app worker instances will be merged into the same file, default value is false, allowed values true|false
// exec_interpreter: interpreter of your app, e.g. "node"
// exec_mode: execution mode of your app (can also be defined by the instances field), e.g. "fork", allowed values fork|cluster
// autorestart: if enabled, PM2 will automatically restart apps on crashes, e.g. false, default is true, allowed values true|false
// vizion: integrates version control metadata with PM2, default value is true, allowed values are true|false
// env: environment varibles for your app, specified as a nested object, like env: { "NODE_ENV": "production", "AWESOME_SERVICE_API_TOKEN": "xxx" }

module.exports = {
	apps: [
		{
			name: "DYM-Logger", // pm2로 실행한 프로세스 목록에서 이 애플리케이션의 이름으로 지정될 문자열
			script: "./server.js", // pm2로 실행될 파일 경로
			watch: ["app", "conf", "utils"],
			ignore_watch : ["node_modules", "logs"],
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
				// cron_restart: "*/1 * * * *", // restart every minute (used for testing)
				NODE_ENV: "development"
			},
			env_staging: {
				// 개발환경시 적용될 설정 지정
				// cron_restart: "*/1 * * * *", // restart every minute (used for testing)
				NODE_ENV: "staging"
			},
			env_production: {
				// 배포환경시 적용될 설정 지정
				// cron_restart: "* 4 * * *", // restart every day 4 hour (used for testing)
				NODE_ENV: "production"
			}
		}
	]
};