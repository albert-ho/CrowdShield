//document.styleSheets[0].insertRule("[tweet-is-negative=true]{display:none}", 0);
tweet_buttons();
document.styleSheets[0].insertRule("[tweet-is-negative=true]{background-color:rgba(255, 0, 0, 0.4)}", 0);
document.styleSheets[0].insertRule("[tweet-is-negative=false]{background-color:rgba(0, 255, 0, 0.4)}", 0);
setInterval(process_tweets, 2000);
//test_tweets();
//setInterval(store_tweets, 200);
