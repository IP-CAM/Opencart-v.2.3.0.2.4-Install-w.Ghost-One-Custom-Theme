if(!Array.prototype.reduce){Object.defineProperty(Array.prototype,'reduce',{value:function(callback){"use strict";if(this===null){throw new TypeError('Array.prototype.reduce '+
'called on null or undefined');}
if(typeof callback!=='function'){throw new TypeError(callback+
' is not a function');}
var o=Object(this);var len=o.length>>>0;var k=0;var value;if(arguments.length>=2){value=arguments[1];}else{while(k<len&&!(k in o)){k++;}
if(k>=len){throw new TypeError('Reduce of empty array '+
'with no initial value');}
value=o[k++];}
while(k<len){if(k in o){value=callback(value,o[k],k,o);}
k++;}
return value;}});}
if(typeof Object.assign!=='function'){Object.assign=function(target){'use strict';if(target==null){throw new TypeError('Cannot convert undefined or null to object');}
target=Object(target);for(var index=1;index<arguments.length;index++){var source=arguments[index];if(source!=null){for(var key in source){if(Object.prototype.hasOwnProperty.call(source,key)){target[key]=source[key];}}}}
return target;};}
if(window.NodeList&&!NodeList.prototype.forEach){NodeList.prototype.forEach=function(callback,thisArg){thisArg=thisArg||window;for(var i=0;i<this.length;i++){callback.call(thisArg,this[i],i,this);}};}