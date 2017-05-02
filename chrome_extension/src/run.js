//document.styleSheets[0].insertRule("[tweet-is-negative=true]{display:none}", 0);
button_tweets();
document.styleSheets[0].insertRule("[tweet-is-negative=true]{background-color:rgba(255, 0, 0, 0.4)}", 0);
setInterval(abp_process_tweets, 200);
//test_tweets();
//setInterval(test_tweets, 200);
//setInterval(store_tweets, 200);
