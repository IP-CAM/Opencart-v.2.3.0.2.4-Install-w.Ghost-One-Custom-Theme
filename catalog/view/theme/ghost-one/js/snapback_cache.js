var SnapbackCache=(function(options){var options=options||{}
var SessionStorageHash=(function(){var set=function(namespace,key,item){var storageHash=sessionStorage.getItem(namespace);if(!storageHash){storageHash={}}else{storageHash=JSON.parse(storageHash)}
if(item){storageHash[key]=JSON.stringify(item)}else{delete storageHash[key]}
sessionStorage.setItem(namespace,JSON.stringify(storageHash))}
var get=function(namespace,key,item){var storageHash=sessionStorage.getItem(namespace)
if(storageHash){storageHash=JSON.parse(storageHash)
if(storageHash[key]){return JSON.parse(storageHash[key])}}
return null}
return{set:set,get:get}})()
var enabled=true
var disable=function(){enabled=false}
var enable=function(){enabled=true}
var supported=function(){return!!(sessionStorage&&history&&enabled)}
var setItem=function(url,value){if(value){trimStorage()}
SessionStorageHash.set("pageCache",url,value)}
var getItem=function(url){return SessionStorageHash.get("pageCache",url)}
var removeItem=function(url){setItem(url,null)}
var disableAutofocusIfReplacingCachedPage=function(){if(typeof options.removeAutofocus==="function"){if(willUseCacheOnThisPage()){options.removeAutofocus()}}}
var cachePage=function(filterOut,callbackFunction){if(typeof filterOut==='function'){callbackFunction=filterOut
filterOut=null}
if(!supported()){if(callbackFunction){callbackFunction()}
return;}
jQuery(document).finish()
if(typeof options.wait==="function")
options.finish()
setTimeout(function(){if(typeof options.removeAutofocus==="function")
options.removeAutofocus()
var $cachedBody=jQuery(options.bodySelector)
if(filterOut){$cachedBody=$cachedBody.clone().find(filterOut).replaceWith("").end()}
var cachedPage={body:$cachedBody.html(),title:document.title,positionY:window.pageYOffset,positionX:window.pageXOffset,cachedAt:new Date().getTime()}
if(typeof options.nextPageOffset==="function")
cachedPage.nextPageOffset=options.nextPageOffset()
setItem(document.location.href,cachedPage)
jQuery(options.bodySelector).trigger("snapback-cache:cached",cachedPage)
if(callbackFunction){callbackFunction()}},500)}
var loadFromCache=function(noCacheCallback){if(willUseCacheOnThisPage()){var cachedPage=getItem(document.location.href)
jQuery(options.bodySelector).html(cachedPage.body)
if(typeof options.removeAutofocus==="function")
options.removeAutofocus()
setTimeout(function(){window.scrollTo(cachedPage.positionX,cachedPage.positionY)},1);removeItem(document.location.href)
jQuery(options.bodySelector).trigger("snapback-cache:loaded",cachedPage)
var dirties=getDirties()
if(dirties){if(typeof options.refreshItems==="function")
options.refreshItems(dirties)
clearDirty()}
return false;}
else{if(noCacheCallback){noCacheCallback()}
else{return}}}
var clearDirty=function(){sessionStorage.removeItem("pageCache-dirty")}
var getDirties=function(){var raw=sessionStorage.getItem("pageCache-dirty")
if(raw){var json=JSON.parse(raw)
return jQuery.map(json,function(value,key){return key})}else{return null}}
var markDirty=function(item){SessionStorageHash.set("pageCache-dirty",item,true)}
var trimStorage=function(){var storageHash=sessionStorage.getItem("pageCache");if(storageHash){storageHash=JSON.parse(storageHash);var tuples=[];for(var key in storageHash){tuples.push([key,storageHash[key]])}
if(tuples.length>=10){tuples.sort(function(a,b){a=a[1].cachedAt;b=b[1].cachedAt;return b<a?-1:(b>a?1:0);});for(var i=0;i<(tuples.length+1-10);i++){var key=tuples[i][0];delete storageHash[key];}
sessionStorage.setItem(namespace,JSON.stringify(storageHash));}}}
var willUseCacheOnThisPage=function(){if(!supported()){return false;}
var cachedPage=getItem(document.location.href)
if(cachedPage&&cachedPage.cachedAt>(new Date().getTime()-900000)){return true;}
else{return false;}}
jQuery(document).ready(function(){disableAutofocusIfReplacingCachedPage()});jQuery(window).load(function(){loadFromCache()});return{enable:enable,disable:disable,remove:removeItem,loadFromCache:loadFromCache,cachePage:cachePage,markDirty:markDirty,willUseCacheOnThisPage:willUseCacheOnThisPage}});