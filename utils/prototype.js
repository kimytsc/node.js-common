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
	return s
}
 
String.prototype.rpad = function(padLength, padString){
	var s = this;
	while(s.length < padLength)
		s += padString;
	return s
}

Number.prototype.in_array = 
String.prototype.in_array = function(arr){
	var s = this;
	arr = arr || [];
	return arr.some(function(el){
		return el == s
	})
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

String.prototype.trim = function(){
	var s = this;
	return s?s.replace(/^\s+|\s+$/gm,''):s
}

String.prototype.ltrim = function(){
	return s?s.replace(/^\s+/,''):s
}

String.prototype.rtrim = function(){
	return s?s.replace(/\s+$/,''):s
}

// https://davidwalsh.name/javascript-clone-array
Array.prototype.clone = function(){
	return this.slice(0)
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

// https://code.i-harness.com/en/q/46eb89
Object.defineProperty(
    Object.prototype, 
    'renameProperty',
    {
        writable : false, // Cannot alter this property
        enumerable : false, // Will not show up in a for-in loop.
        configurable : false, // Cannot be deleted via the delete operator
        value : function (oldName, newName) {
            // Do nothing if the names are the same
            if (oldName == newName) {
                return this;
            }
            // Check for the old property name to 
            // avoid a ReferenceError in strict mode.
            if (this.hasOwnProperty(oldName)) {
                this[newName] = this[oldName];
                delete this[oldName];
            }
            return this;
        }
    }
);

// MongoDB not allowing using '.' in key [duplicate]
// https://stackoverflow.com/questions/28664383/mongodb-not-allowing-using-in-key
Object.defineProperty(
    Object.prototype, 
    'dotProperty',
    {
        writable : false, // Cannot alter this property
        enumerable : false, // Will not show up in a for-in loop.
        configurable : false, // Cannot be deleted via the delete operator
        value : function (obj) {
			var newName;
			obj = obj || this;

			for(let oldName in obj){
				if (this.hasOwnProperty(oldName)){
					if(this[oldName].constructor === Object){
						this[oldName].dotProperty()
					}else{
						newName = oldName;
						if(newName.search('\\.') !== -1){
							newName = newName.replace(/\./g, "\uFF0E");
						}
						if(newName.search('\\$') !== -1){
							newName = newName.replace(/\$/g, "\uFF04")
						}
						if(newName !== oldName){
							this[newName] = this[oldName];
							delete this[oldName];
						}
					}
				}
			}
            return this;
        }
    }
);

Object.defineProperty(
    Object.prototype, 
    'undotProperty',
    {
        writable : false, // Cannot alter this property
        enumerable : false, // Will not show up in a for-in loop.
        configurable : false, // Cannot be deleted via the delete operator
        value : function (obj) {
			var newName;
			obj = obj || this;

			for(let oldName in obj){
				if (this.hasOwnProperty(oldName)){
					if(this[oldName].constructor === Object){
						this[oldName].undotProperty()
					}else{
						newName = oldName;
						if(newName.search('\uFF0E') !== -1){
							newName = newName.replace(/\uFF0E/g, "\.");
						}
						if(newName.search('\uFF04') !== -1){
							newName = newName.replace(/\uFF04/g, "\$")
						}
						if(newName !== oldName){
							this[newName] = this[oldName];
							delete this[oldName];
						}
					}
				}
			}
            return this;
        }
    }
);

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