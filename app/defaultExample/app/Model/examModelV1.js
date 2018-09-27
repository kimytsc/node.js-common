/**
 * @file	examModelV1.js
 * @brief	Access Model
 * @version	1.0
 * @author	김용태 (kimytsc@gmail.com)
 */
'use strict';

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const ObjectId = require('mongoose').Types.ObjectId;

var actionSchema = {
	accessId: {
		type: mongoose.Schema.Types.ObjectId,
		index: true
	},
	actionCount: {type: Number, default: 0 },
    event: { type: String, default: 0 },
	clientWidth: { type: Number, default: 0 },
	clientHeight: { type: Number, default: 0 },
	clientX: { type: Number, default: 0 },
	clientY: { type: Number, default: 0 },
	tagName: { type: String, default: '' },
	elementId: { type: String, default: '' },
	elementName: { type: String, default: '' },
	elementType: { type: String, default: '' },
	elementText: { type: String, default: '' },
	elementHtml: { type: String, default: '' },
	formData: { type: Object, default: {} },
	userDatetime: { type: Date, default: Date.now  },
	datetime: { type: Date, default: Date.now  }
};

var accessSchema = {
	// _id: {
	// 	type: mongoose.Schema.Types.ObjectId,
	// 	index: true,
	// 	required: true,
	// 	auto: true
	// },
    userId: { type: String, default: '' },
    userIdx: { type: Number, default: 0 },
    compIdx: { type: Number, default: 0 },
	userAgent: { type: String, default: '' },
	hostname: { type: String, default: '' },
	pathname: { type: String, default: '' },
	href: { type: String, default: '' },
	referrer: { type: String, default: '' },
	actionList: { type: Array },
	lastAction: {type: Object, default: {} },
	datetime: { type: Date, default: Date.now  }
};

var accessLog = mongoose.model('accessLog', new mongoose.Schema(accessSchema, {collection: 'accessLog', versionKey: false}));
var actionLog = mongoose.model('actionLog', new mongoose.Schema(actionSchema, {collection: 'actionLog', versionKey: false}));

// Custom function : "Save"
exports.saveAccess = (obj) => {
	var log = new accessLog();
	for(var i in obj.data){
		if(obj.data.hasOwnProperty(i) && (accessSchema[i] || false)){
			log[i] = obj.data[i];
		}
	}

	log.save(obj.callback);
	// return accessLog;
}

exports.saveAction = (obj) => {
	var obj = obj;
	var log = new actionLog();
	for(var i in obj.data){
		if(obj.data.hasOwnProperty(i) && (actionSchema[i] || false)){
			log[i] = obj.data[i];
		}
	}

	accessLog.findById(obj.find, function (err, data) {
		data.lastAction = log;
		if(err) {
			obj.callBack(err);
			console.log(err);
		} else {
			if(data.lastAction && data.lastAction.actionCount > obj.data.actionCount){
				log.save(obj.callback);
			}else{
				data.save(function(err, data){
					log.save(obj.callback);
				});
			}
		}
	});

	// return actionLog;
}

// Custom function : "addAction"
exports.addAction = (obj) => {
	var log = new accessLog();
	var obj = obj;

	accessLog.findById(obj.find, function (err, data) {
		delete obj.data.accessId;
		data.actionList.push(obj.data);
		if(err) {
			obj.callBack(err);
			console.log(err);
		} else {
			data.save(obj.callback);
		}
	});
}

exports.findAccess = accessLog.find.bind(accessLog);

exports.findAction = actionLog.find.bind(actionLog);

exports.findById = accessLog.findById.bind(accessLog);

exports.aggregate = accessLog.aggregate.bind(accessLog);

exports.ObjectId = (str) => {
	return new ObjectId(str)
}
