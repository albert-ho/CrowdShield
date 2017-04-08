//document.styleSheets[0].insertRule("[tweet-is-negative=true]{display:none}", 0);
document.styleSheets[0].insertRule("[tweet-is-negative=true]{background-color:rgba(255, 0, 0, 0.4)}", 0);
setInterval(abp_process_tweets, 200);
