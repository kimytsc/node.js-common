/**
 * @file	Override.js
 * @brief	Override Management
 * @version	1.0
 * @author	김용태 (kimytsc@gmail.com)
 */
'use strict'

/*
// include the module whose functions are to be overridden
var fs = require('fs');
 
// delete the function you would like to override
delete fs['readFile'];
 
// add new functional with the same name as deleted function
fs.readFile = function(str){
    console.log("The functionality has been overridden.");
    console.log(str);
}
*/



// Init
module.exports = (app) => {

	return this;
}