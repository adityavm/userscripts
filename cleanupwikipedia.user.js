// ==UserScript==
// @name           Clean-up Wikipedia
// @namespace      http://github.com/adityavm/userscripts
// @description    Clean up things on Wikipedia + Just give me the article damnit!
// @include        *en.wikipedia.org/wiki*
// @match			http://*.wikipedia.org/wiki*
// ==/UserScript==

(function(){var DomReady=window.DomReady={};var userAgent=navigator.userAgent.toLowerCase();var browser={version:(userAgent.match(/.+(?:rv|it|ra|ie)[\/: ]([\d.]+)/)||[])[1],safari:/webkit/.test(userAgent),opera:/opera/.test(userAgent),msie:(/msie/.test(userAgent))&&(!/opera/.test(userAgent)),mozilla:(/mozilla/.test(userAgent))&&(!/(compatible|webkit)/.test(userAgent))};var readyBound=false;var isReady=false;var readyList=[];function domReady(){if(!isReady){isReady=true;if(readyList){for(var fn=0;fn<readyList.length;fn++){readyList[fn].call(window,[])}readyList=[]}}};function addLoadEvent(func){var oldonload=window.onload;if(typeof window.onload!='function'){window.onload=func}else{window.onload=function(){if(oldonload){oldonload()}func()}}};function bindReady(){if(readyBound){return}readyBound=true;if(document.addEventListener&&!browser.opera){document.addEventListener("DOMContentLoaded",domReady,false)}if(browser.msie&&window==top)(function(){if(isReady)return;try{document.documentElement.doScroll("left")}catch(error){setTimeout(arguments.callee,0);return}domReady()})();if(browser.opera){document.addEventListener("DOMContentLoaded",function(){if(isReady)return;for(var i=0;i<document.styleSheets.length;i++)if(document.styleSheets[i].disabled){setTimeout(arguments.callee,0);return}domReady()},false)}if(browser.safari){var numStyles;(function(){if(isReady)return;if(document.readyState!="loaded"&&document.readyState!="complete"){setTimeout(arguments.callee,0);return}if(numStyles===undefined){var links=document.getElementsByTagName("link");for(var i=0;i<links.length;i++){if(links[i].getAttribute('rel')=='stylesheet'){numStyles++}}var styles=document.getElementsByTagName("style");numStyles+=styles.length}if(document.styleSheets.length!=numStyles){setTimeout(arguments.callee,0);return}domReady()})()}addLoadEvent(domReady)};DomReady.ready=function(fn,args){bindReady();if(isReady){fn.call(window,[])}else{readyList.push(function(){return fn.call(window,[])})}};bindReady()})();

DomReady.ready(function(){

	function $(el){ return document.getElementById(el); }

	$('siteNotice').style.display = "none";
	$('mw-panel').style.opacity = "0";
	$('mw-articlefeedback').style.display = "none";
	$('footer').style.opacity = "0";
	$('mw-head').style.opacity = "0";

});
