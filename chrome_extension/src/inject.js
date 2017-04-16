chrome.extension.sendMessage({}, function(response) {
	var readyStateCheckInterval = setInterval(function() {
	if (document.readyState === "complete") {
		clearInterval(readyStateCheckInterval);

		/*
		function abp_process_tweets() {
		    $('.tweet-text').not('.abp_processed').each(function(i, node) {
		        var score = abp_sentiment(node.textContent);
		        if (score <= 0) {
		            node.parentNode.parentNode.setAttribute('tweet-is-negative', 'true');
		        }
		        node.className += ' abp_processed';
		    })
		}

		document.styleSheets[0].insertRule("[tweet-is-negative=true]{background-color:rgba(255, 0, 0, 0.4)}", 0);
		setInterval(abp_process_tweets, 200);
		*/

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
