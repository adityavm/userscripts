// ==UserScript==
// @name            Fetch Link Titles
// @author          Aditya V. Mukherjee
// @namespace       http://adityamukherjee.com/
// @description     Because links are the most unusable UI elements ever
// @license         MIT
// @version	        0.2
// @include         *
// @released        2013-10-17
// @compatible      Greasemonkey, GreaseKit
// ==/UserScript==

// domready
(function(){var DomReady=window.DomReady={};var userAgent=navigator.userAgent.toLowerCase();var browser={version:(userAgent.match(/.+(?:rv|it|ra|ie)[\/: ]([\d.]+)/)||[])[1],safari:/webkit/.test(userAgent),opera:/opera/.test(userAgent),msie:(/msie/.test(userAgent))&&(!/opera/.test(userAgent)),mozilla:(/mozilla/.test(userAgent))&&(!/(compatible|webkit)/.test(userAgent))};var readyBound=false;var isReady=false;var readyList=[];function domReady(){if(!isReady){isReady=true;if(readyList){for(var fn=0;fn<readyList.length;fn++){readyList[fn].call(window,[])}readyList=[]}}};function addLoadEvent(func){var oldonload=window.onload;if(typeof window.onload!='function'){window.onload=func}else{window.onload=function(){if(oldonload){oldonload()}func()}}};function bindReady(){if(readyBound){return}readyBound=true;if(document.addEventListener&&!browser.opera){document.addEventListener("DOMContentLoaded",domReady,false)}if(browser.msie&&window==top)(function(){if(isReady)return;try{document.documentElement.doScroll("left")}catch(error){setTimeout(arguments.callee,0);return}domReady()})();if(browser.opera){document.addEventListener("DOMContentLoaded",function(){if(isReady)return;for(var i=0;i<document.styleSheets.length;i++)if(document.styleSheets[i].disabled){setTimeout(arguments.callee,0);return}domReady()},false)}if(browser.safari){var numStyles;(function(){if(isReady)return;if(document.readyState!="loaded"&&document.readyState!="complete"){setTimeout(arguments.callee,0);return}if(numStyles===undefined){var links=document.getElementsByTagName("link");for(var i=0;i<links.length;i++){if(links[i].getAttribute('rel')=='stylesheet'){numStyles++}}var styles=document.getElementsByTagName("style");numStyles+=styles.length}if(document.styleSheets.length!=numStyles){setTimeout(arguments.callee,0);return}domReady()})()}addLoadEvent(domReady)};DomReady.ready=function(fn,args){bindReady();if(isReady){fn.call(window,[])}else{readyList.push(function(){return fn.call(window,[])})}};bindReady()})();

DomReady.ready(function(){
	function addStyle(css) {
		var heads = document.getElementsByTagName("head");
		if (heads.length > 0) {
			var node = document.createElement("style");
			node.type = "text/css";
			node.appendChild(document.createTextNode(css));
			heads[0].appendChild(node); 
		}
	}

	addStyle("a.flt-a-done:after { content: '\\2022';color: #27AE60;font-weight: 600;vertical-align: middle;margin-left: 3px; }");

	var a = document.querySelectorAll("a");
	for(var i=0,l=a.length;i<l;i++){
		doLinkTitle(a[i]);
	}

	function doLinkTitle(a){

		if(a.href.indexOf("javascript")>-1)//skip javascript links
			return;

		var xhr = new XMLHttpRequest();
		xhr.onload = function(data){
			var js = JSON.parse(this.responseText);
			if(js.query.results)
				if(js.query.results.title){
					a.setAttribute("title", js.query.results.title);
					var cls = a.getAttribute("class") ? a.getAttribute("class") : "";
					a.setAttribute("class", cls+" flt-a-done");
				}
			else
				console.log(a.href, JSON.parse(this.responseText).query.results.title);
		}

		var query = "https://query.yahooapis.com/v1/public/yql?q="+ encodeURIComponent("select * from html where url='"+ a.href +"' and xpath='//title'") +"&format=json";
		xhr.open("GET", query, true);
		xhr.send();
	}
});