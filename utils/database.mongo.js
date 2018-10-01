/**
 * @file	database.mongo.js
 * @brief	MongoDB setup
 * @version	1.0
 * @author	김용태 (kimytsc@gmail.com)
 * 
 * https://mongoosejs.com/docs/connections.html
 * https://www.zerocho.com/category/MongoDB/post/59b6228e92f5830019d41ac4 - promise 확인해볼 것
 */
'use strict';

const mongoose = require("mongoose");

module.exports = (dbInfo) => {
	mongoose.connect(dbInfo.host, dbInfo.opts);

	mongoose.Promise = Promise; // yea... this is kinda odd 

	// mongoose.connection.on('connecting', function (ref) {
	// 	connected = false;
	// 	console.log('connecting.');
	// });
	
	// mongoose.connection.on("connected", () => {
	// 	console.log("Mongo Replica Set Connection Established", 1);
	// });

	// mongoose.connection.on('reconnecting', function () {
	// 	console.log('reconnecting!');
	// });
	
	// mongoose.connection.once('open', function(){
	// 	// CONNECTED TO MONGODB SERVER
	// 	console.log("Connected to mongod server");
	// });

	// mongoose.connection.on("reconnected", () => {
	// 	console.log("Connection Reestablished");
	// });

	// mongoose.connection.on("disconnect", (err) => {
	// 	console.log("Connection Disconnect", err);
	// });

	mongoose.connection.on("disconnected", () => {
		// console.log("Connection Disconnected");
		setTimeout(function(){
			mongoose.connect(dbInfo.host, dbInfo.opts);
		}, (dbInfo.opts && dbInfo.opts.reconnectInterval) || 2000);
	});

	// mongoose.connection.on("close", () => {
	// 	console.log("Connection Closed");
	// });

	mongoose.connection.on("error", (error) => {
		// console.log("ERROR: " + error);
		mongoose.disconnect();
	});

	// mongoose.connection.on('timeout', () => {
	// 	console.log("MongoDB timeout", arguments);
	// });

	[
		"connecting",
		"connected",
		"open",
		"disconnecting",
		"disconnected",
		"close",
		"reconnected",
		"error",
		"fullsetup",
		"all"
	].forEach(event => {
		mongoose.connection.on(event, function () {
			// console.log('Mongoose event ' + event);
		});
	});
		
	process.on('SIGINT', function() {  
		mongoose.connection.close(function () {
			console.log('Mongoose default connection disconnected through app termination');
			process.exit(0);
		});
	});

	// PingPong setup Start
	var PingPong = {
		pong: false,
		ping: function() {
			// console.log(Date.date('Y-m-d H:i:s:z'), PingPong.pong ? 'T' : 'F');
			if(!PingPong.pong){
				PingPong.pong = true;
				if(mongoose.connection.readyState === 1){
					mongoose.connection.db.admin().ping(function (err, result) {
						PingPong.pong = false;
						if (err || !result) {
							// console.log('no ping result');
						} else {
							// console.log(Date.date('Y-m-d H:i:s:z'), 'ping');
						}
					});
				}else{
					PingPong.pong = false;
				}
			}else{
				if(mongoose.connection.readyState === 1){
					mongoose.connection.readyState = 0;
				}
			}
		}
	}
	setInterval(PingPong.ping, (dbInfo.opts && dbInfo.opts.keepAliveInitialDelay) || 2000);
	// PingPong setup End

	return mongoose;
};