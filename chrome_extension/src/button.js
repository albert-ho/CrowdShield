// TODO: Clean up namespace, remove or keep error + success logs?
var db;
var dbName = $('.ProfileCard')[0].attributes['data-screen-name'].value;
var DBOpenRequest = window.indexedDB.open(dbName, 1);
DBOpenRequest.onerror = function(event) {
  alert("OH NO, ERROR!");
};
DBOpenRequest.onsuccess = function(event) {
  db = DBOpenRequest.result;
}
DBOpenRequest.onupgradeneeded = function(event) {
  var db = event.target.result;
  var objectStore = db.createObjectStore("tweets", { keyPath: "id" });
};


// HACK: To get tweet_data values + db, maybe modularize process later?
function store_tweet(event) {
  var abusive = event.data.abusive
  var tweet = event.target.closest('.tweet');
  var id = tweet.attributes['data-tweet-id'].value;
  // TODO: Can I get raw HTML with <b> included?
  var text = tweet.getElementsByClassName('tweet-text')[0].textContent;
  var date = tweet.getElementsByClassName('tweet-timestamp')[0].getAttribute('title');
  var username = tweet.getElementsByClassName('username')[0].getElementsByTagName('b')[0].innerText;
  var tweet_data = {id: id, text: text, date: date, username: username, abusive: abusive};
  var tweetObjectStore = db.transaction("tweets", "readwrite").objectStore("tweets");
  tweetObjectStore.put(tweet_data, id);
}


// TODO: Make sure button is added to new tweets that are loaded onto screen as well
function tweet_buttons() {

  var $li_abusive = $('<li>', {"class": "button-abusive", "role": "presentation"});
  var $button_abusive = $('<button>', {"class": "dropdown-link", "type": "button", "role": "menuitem", "text": "Mark Tweet Abusive"});
  $li_abusive.append($button_abusive);

  var $li_benign = $('<li>', {"class": "button-benign", "role": "presentation"});
  var $button_benign = $('<button>', {"class": "dropdown-link", "type": "button", "role": "menuitem", "text": "Mark Tweet Benign"});
  $li_benign.append($button_benign);

  var $ul = $('.ProfileTweet-action > .dropdown > .dropdown-menu > ul');
  $ul.prepend($li_abusive);
  $ul.prepend($li_benign);

  var $abusive = $('.button-abusive');
  $abusive.click({abusive: 1}, store_tweet);

  var $benign = $('.button-benign')
  $benign.click({abusive: 0}, store_tweet);
}
