/**
 * @file	myApp.js
 * @brief	myApp Container
 * @version	1.0
 * @author	김용태 (kimytsc@gmail.com)
 */
'use strict';

function myApp(dirname) {
	const serverRoot = dirname;
	const appList = {};

	function documentRoot(dirname){
		var i = 1,
			dirname = dirname.split('/');
		do{
			if(appList[dirname.slice(0, i).join('/')]){
				return appList[dirname.slice(0, i).join('/')]
			}
		}while(i++ < dirname.length);

		return {};
	}
	function isObject(item) {
		return (item && typeof item === 'object' && !Array.isArray(item));
	}

	function assignDeep(target, ...sources) {
		if (!sources.length) return target;
		const source = sources.shift();
	  
		if (isObject(target) && isObject(source)) {
			for (const key in source) {
				if (isObject(source[key])) {
					if (!target[key]) {
						Object.assign(target, { [key]: {} });
					}else{
						target[key] = Object.assign({}, target[key])
					}
					assignDeep(target[key], source[key]);
				} else {
					Object.assign(target, { [key]: source[key] });
				}
			}
		}
		return assignDeep(target, ...sources);
	}

	return {
		set: function(dirname, opts){
			appList[dirname] = assignDeep({}, opts || {}, appList[dirname] || {});
			return this;
		},
		get: function(dirname){
			return documentRoot(dirname)
		}
	}
};

module.exports = new myApp(__basedir);