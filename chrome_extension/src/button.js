var db;
var dbName = $('.ProfileCard')[0].attributes['data-screen-name'].value;
var DBOpenRequest = window.indexedDB.open(dbName, 1);
DBOpenRequest.onerror = function(event) {
  alert("OH NO, ERROR!");
};
DBOpenRequest.onsuccess = function(event) {
  alert("Opened database, yay!");
  db = DBOpenRequest.result;
}
DBOpenRequest.onupgradeneeded = function(event) {
  var db = event.target.result;
  db.onerror = function(event) {
    alert("OH NO, ERROR!");
  };
  var objectStore = db.createObjectStore("tweets", { keyPath: "id" });
  alert("objectStore created!");
};

// HACK: To get tweet_data values + db, maybe modularize process later?
function test_tweet(event) {
  var tweet = event.target.closest('.tweet');
  var id = tweet.attributes['data-tweet-id'].value;
  // TODO: Can I get raw HTML with <b> included?
  var text = tweet.getElementsByClassName('tweet-text')[0].textContent;
  var date = tweet.getElementsByClassName('tweet-timestamp')[0].getAttribute('title');
  var username = tweet.getElementsByClassName('username')[0].getElementsByTagName('b')[0].innerText;
  var tweet_data = {id: id, text: text, date: date, username: username};

  var transaction = db.transaction("tweets", "readwrite");
  transaction.oncomplete = function(event) {
    alert("transaction success!");
  };
  transaction.onerror = function(event) {
    alert("transaction error!");
  };
  var tweetObjectStore = transaction.objectStore("tweets");

  //var tweetObjectStore = db.transaction("tweets", "readwrite").objectStore("tweets");
  var objectStoreRequest = tweetObjectStore.add(tweet_data);
  objectStoreRequest.onsuccess = function(event) {
    alert("stored tweet, yay!");
  }
}


// TODO: Make sure button is added to new tweets that are loaded onto screen as well
function button_tweets() {
  var $li = $('<li>', {"class": "twitterbert-button", "role": "presentation"});
  var $button = $('<button>', {"class": "dropdown-link", "type": "button", "role": "menuitem", "text": "TESTING123"});
  var $ul = $('.ProfileTweet-action > .dropdown > .dropdown-menu > ul');
  $li.append($button);
  $ul.prepend($li);
  var $twitterbert_button = $('.twitterbert-button');
  $twitterbert_button.click(test_tweet);
}
