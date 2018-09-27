/**
 * @file	prototype.js
 * @brief	Prototype setup
 * @version	1.0
 * @author	김용태 (kimytsc@gmail.com)
 */
'use strict';

String.prototype.lpad = function(padLength, padString){
	var s = this;
	while(s.length < padLength)
		s = padString + s;
	return s;
}
 
String.prototype.rpad = function(padLength, padString){
	var s = this;
	while(s.length < padLength)
		s += padString;
	return s;
}

Number.prototype.in_array = 
String.prototype.in_array = function(arr){
	var s = this;
	arr = arr || [];
	return arr.some(function(el){
		return el == s;
	});
}

String.prototype.parsePathname = function(){
	var s = this,
		fname;
	s = s.split('/');
	fname = s.pop().split('.');
	
	return {
		path: s.join('/') + '/',
		ext: fname.pop(),
		name: fname.join('.')
	}
}

// Object.prototype.join 사용하면 에러남
// Object.prototype.join = function(separator){
// 	var s = this,
// 		arr = new Array(),
// 		separator = separator || '&';
// 
// 	Object.keys(s).forEach(function(key){
// 		arr[arr.length] = key + '=' + s[key];
// 	});
// 
// 	return arr.join(separator)
// }

Date.prototype.date = function(idx, charset){
	var	charset = charset || 'eng',
		now = this instanceof Date ? this : new Date();

	switch(idx){
		case undefined:
		case 'timestamp':return parseInt(now.getTime()/1000);
		case 'microtimestamp':return parseInt(now.getTime());
		case 'day':return now.getDay();
		case 'week':return ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'][now.getDay()];
		case 'w':return ['0','1','2','3','4','5','6'][now.getDay()];
		case 'W':return (function(charset, idx){
				switch(charset){
					case 'kor'	: return ['일','월','화','수','목','금','토'][idx];
					case 'eng'	:
					default		: return ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'][idx];
				}
			}(charset, now.getDay()));
		default:
			idx=idx.replace(/Y/g, now.getFullYear());
			idx=idx.replace(/y/g, now.getFullYear().toString().substr(2, 2));
			idx=idx.replace(/m/g, (now.getMonth()+1).toString().lpad(2, '0'));
			idx=idx.replace(/M/g, (function(charset, idx){
				switch(charset){
					case 'kor'	: return ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'][idx];
					case 'eng'	:
					default		: return ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'][idx];
				}
				return idx;
			}(charset, now.getMonth())))
			idx=idx.replace(/d/g, now.getDate().toString().lpad(2, '0'));
			idx=idx.replace(/H/g, now.getHours().toString().lpad(2, '0'));
			idx=idx.replace(/h/g, (function(hour){
				return hour = hour>12 ? hour-12 : hour;
			}(parseInt(now.getHours()))).toString().lpad(2, '0'));
			idx=idx.replace(/i/g, now.getMinutes().toString().lpad(2, '0'));
			idx=idx.replace(/s/g, now.getSeconds().toString().lpad(2, '0'));
			idx=idx.replace(/z/g, now.getMilliseconds().toString().lpad(3, '0'));
			idx=idx.replace(/w/g, ['0','1','2','3','4','5','6'][now.getDay()]);
			idx=idx.replace(/W/g, (function(charset, idx){
				switch(charset){
					case 'kor'	: return ['일','월','화','수','목','금','토'][idx];
					case 'eng'	:
					default		: return ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'][idx];
				}
			}(charset, now.getDay())));
			return idx;
	}
}

Date.date = Date.prototype.date.bind(Date);