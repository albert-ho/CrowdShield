chrome.extension.sendMessage({}, function(response) {
	var readyStateCheckInterval = setInterval(function() {
	if (document.readyState === "complete") {
		clearInterval(readyStateCheckInterval);

	  ['afinn.js', 'abp.js', 'run.js'].map(function(script) {
	      var s = document.createElement('script');
	      s.src = chrome.extension.getURL('src/' + script);
	      s.onload = function() {
	          this.parentNode.removeChild(this);
	      };
	      (document.head||document.documentElement).appendChild(s);
	  });
	}
	}, 10);
});
