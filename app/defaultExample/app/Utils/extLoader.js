/**
 * @file	extLoader.js
 * @brief	전달받은 폴더의 파일들을 가져와서 리스트 반환
 * @version	1.0
 * @author	김용태 (kimytsc@gmail.com)
 * @param	{String}	rootFolder	파일을 가져올 폴더 시작위치
 * @param	{Integer}	maxDepth	하위 depth까지의 폴더에서 가져 올 것인가(default = 1, 현재 폴더)
 */
'use strict';

module.exports = (rootFolder, extList, maxDepth) => {
	const fs = require('fs');
	const path = require('path');

	maxDepth = maxDepth || 1;

	function getList(setupFolder, depth, returnData){
		setupFolder = setupFolder || false;
		depth = depth || 0;
		returnData = returnData || [];
		var searchFolder = rootFolder + (setupFolder || ''),
			searchFile = false;

		if(depth < (maxDepth < 0 ? depth + 1 : maxDepth)){
			fs.readdirSync(searchFolder).forEach(file => {
				searchFile = searchFolder + '/' + file;
				if(fs.lstatSync(searchFile).isDirectory()){
					// Directory
					returnData = returnData.concat(getList((setupFolder || '') + '/' + file, depth + 1)).filter(function(el){return el});
				}else{
					// File
					if(path.parse(file).ext.in_array(extList)){
						returnData.push(searchFile);
					}
				}
			});
		}

		return depth !== maxDepth ? returnData : false;
	}

	return getList() || [];
};