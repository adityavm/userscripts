// ==UserScript==
// @name			Auto-silence Youtube
// @namespace		https://github.com/adityavm/userscripts/blob/master/autosilenceyoutube.user.js
// @description		Automatically quieten Youtube when visiting a video-page by redirecting to Quietube
// @include			*youtube.com/watch*
// @include			*youtube.com/results*
// ==/UserScript==

var loc = window.location.href;
if(loc.indexOf('results') != -1){//on a search results page
	/**
	 * Rewrite the links so that they
	 * go directly to Quietube
	 */

	//the main results
	var rc = document.getElementsByClassName('result-item-main-content');
	for(i in rc){
		if(rc[i].getElementsByTagName){
			var title = rc[i].getElementsByTagName('h3')[0],//it's always the first one
				a = title.getElementsByTagName('a')[0],
				url = a.href;

			a.href = "http://quietube.com/v.php/"+url;
		}
	}

	//the little playlist links
	var pl_a = document.getElementsByClassName('playlist-detail-title');
	for(i in pl_a)
		pl_a[i].href = "http://quietube.com/v.php/" + pl_a[i].href;

}

if(loc.indexOf('watch') != -1){//on a video page
	if(loc.indexOf('quietube') == -1)
		window.location = "http://quietube.com/v.php/"+loc;
}
