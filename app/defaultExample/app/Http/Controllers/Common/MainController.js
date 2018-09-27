/**
 * @file	MainController.js
 * @brief	Controller mapping
 * @version	1.0
 * @author	김용태 (kimytsc@gmail.com)
 */
'use strict';

exports.index = (req, res, next) => {
	res.render('index.html', {
		examVar1: "var1",
		examVar2: "var2",
		examVar3: {
			examVar4: "var4",
			examVar5: "var5",
		}
	})
}