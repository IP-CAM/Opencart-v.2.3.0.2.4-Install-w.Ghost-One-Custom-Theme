var settings={toolboxVersion:7.625,sender_id:'785774549167'};var deferredPrompt;window.addEventListener('beforeinstallprompt',function(event){event.preventDefault();return false;});function isFunction(functionToCheck){var getType={};return functionToCheck&&getType.toString.call(functionToCheck)==='[object Function]';}
function isIosPWA(){const userAgent=window.navigator.userAgent.toLowerCase();return /iphone|ipad|ipod/.test(userAgent);}
function isInStandaloneMode(){if(window.matchMedia('(display-mode: standalone)').matches){return true;}
if(isIosPWA){if(typeof navigator.standalone!='undefined'&&navigator.standalone){return true;}}
return false;}
function checkWebView(){var url=document.location.href;if(url.search('utm_source=WebView')==-1&&getCookie('web_view_app')!=1){return false;}
return true;}
if(isInStandaloneMode()||checkWebView()){var elem=document.getElementById('footer-app-link');if(elem){elem.style.display="none";}}
if('serviceWorker'in navigator){window.addEventListener('load',function(){navigator.serviceWorker.register('/sw-toolbox.js?v='+settings.toolboxVersion,{scope:'/'}).then(function(registration){if(typeof window.localStorage!=='undefined'&&window.localStorage!==null&&window.localStorage.getItem('ed_sv_version')!=settings.toolboxVersion){window.localStorage.setItem('ed_sv_version',settings.toolboxVersion);registration.update();if(typeof navigator.serviceWorker.controller!="undefined"&&navigator.serviceWorker.controller){navigator.serviceWorker.controller.postMessage({command:'skipWaiting'});}}},function(err){});});}
function blockUpdate(url,block){if(typeof fetch!="undefined"){fetch(url).then(function(response){return response.text();}).then(function(data){var blockSelect=document.querySelector(block);if(blockSelect){blockSelect.innerHTML=data;}});}}
if(typeof Promise!="undefined"){window.isUpdateAvailable=new Promise(function(resolve,reject){if('serviceWorker'in navigator&&['localhost','127'].indexOf(location.hostname)===-1){navigator.serviceWorker.register('/sw-toolbox.js?v='+settings.toolboxVersion,{scope:'/'}).then(function(reg){reg.onupdatefound=function(){const installingWorker=reg.installing;installingWorker.onstatechange=function(){switch(installingWorker.state){case 'installed':if(navigator.serviceWorker.controller){resolve(true);}else{resolve(false);}
break;}};};}).catch(function(err){console.error('[SW ERROR]',err);});}});}
if(typeof firebase!=='undefined'&&firebase!==null){firebase.initializeApp({messagingSenderId:settings.sender_id});}
if('Notification'in window){var messaging=(firebase)?firebase.messaging():'';if(Notification.permission==='granted'){if(messaging){messaging.requestPermission().then(function(){messaging.getToken().then(function(currentToken){sendTokenToServer(currentToken);var url='/index.php?route=api/webpush';$.post(url,{token:currentToken});}).catch(function(err){});});}}
if(Notification.permission!=='granted'&&Notification.permission!=="denied"){var push_elem=document.getElementById("app_subscribe");if(push_elem){push_elem.style.display="block";push_elem.addEventListener('click',function(){subscribe();});}
var success_subscribe_block=document.getElementById("success_subscribe_block");if(success_subscribe_block){success_subscribe_block.style.display="block";}}}
function subscribe(){if(messaging){messaging.requestPermission().then(function(){messaging.getToken().then(function(currentToken){if(currentToken){sendTokenToServer(currentToken);}else{setTokenSentToServer(false);}}).catch(function(err){setTokenSentToServer(false);});}).catch(function(err){});}}
function sendTokenToServer(currentToken){if(currentToken){if(!isTokenSentToServer(currentToken)){var url='/index.php?route=api/webpush';$.post(url,{token:currentToken});setTokenSentToServer(currentToken);}else{}}}
function isTokenSentToServer(currentToken){return window.localStorage.getItem('sentFirebaseMessagingToken')==currentToken;}
function setTokenSentToServer(currentToken){window.localStorage.setItem('sentFirebaseMessagingToken',currentToken?currentToken:'');}
function setCookie(name,value,days){var expires="";if(days){var date=new Date();date.setTime(date.getTime()+(days*24*60*60*1000));expires="; expires="+date.toUTCString();}
document.cookie=name+"="+(value||"")+expires+"; path=/";}
function getCookie(name){var nameEQ=name+"=";var ca=document.cookie.split(';');for(var i=0;i<ca.length;i++){var c=ca[i];while(c.charAt(0)==' ')c=c.substring(1,c.length);if(c.indexOf(nameEQ)==0)return c.substring(nameEQ.length,c.length);}
return null;}
if(isInStandaloneMode()){var auth=getCookie("_ed_identity");if(auth){window.localStorage.setItem('_ed_identity',auth);}else{if(window.localStorage.getItem('_ed_identity')){setCookie("_ed_identity",window.localStorage.getItem('_ed_identity'),100)}}}
function handleTokenByWebView(token){switch(true){case /iPhone|iPad|iPod/.test(navigator.userAgent):{try{window.webkit.messageHandlers.handleToken.postMessage(token);}catch(e){console.log('error in handle token by WebView for IOS: ',e);}
break;}
case /Android/.test(navigator.userAgent):{try{Android.handleToken(token)}catch(e){console.log('error in handle token by WebView for Android: ',e);}
break;}
default:{console.log('open page not in mobile');return;}}}
function handleReloadWebViewForAndroid(){if(/Android/.test(navigator.userAgent)){try{Android.handleReload(window.location.href);}catch(e){console.log('not handle reload: ',e);}}}
function handleChangeLocationWebViewForAndroid(location_url){if(/Android/.test(navigator.userAgent)){try{Android.handleReload(location_url);}catch(e){console.log('not handle reload: ',e);}}}