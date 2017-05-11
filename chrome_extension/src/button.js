// TODO: Clean up namespace, remove or keep error + success logs?
var db_holder = function() {
  var db_holder = {};
  var dbName = $('.ProfileCard')[0].attributes['data-screen-name'].value;
  var DBOpenRequest = window.indexedDB.open(dbName, 1);
  DBOpenRequest.onsuccess = function(event) {
    db_holder.db = DBOpenRequest.result;
  }
  DBOpenRequest.onupgradeneeded = function(event) {
    var db = event.target.result;
    var objectStore = db.createObjectStore("tweets", { keyPath: "id" });
  };
  return db_holder;
}();


// HACK: To get tweet_data values + db, maybe modularize process later?
function store_tweet(event) {

  // Abusiveness
  var abusive = event.data.abusive

  // Metadata related information
  var tweet = event.target.closest('.tweet');
  var id = tweet.attributes['data-tweet-id'].value;
  var date = tweet.getElementsByClassName('tweet-timestamp')[0].getAttribute('title');
  var username = tweet.getElementsByClassName('username')[0].getElementsByTagName('b')[0].textContent;

  // Text related information
  var text = tweet.getElementsByClassName('tweet-text')[0].textContent;
  var lang = tweet.getElementsByClassName('tweet-text')[0].getAttribute('lang');
  var links_list = tweet.getElementsByClassName('twitter-timeline-link');
  var links = $(links_list).map(function(){return $(this).text();}).get();

  // Construction and storage of json
  var tweet_data = {id: id, text: text, date: date, username: username, links: links, lang: lang, abusive: abusive};
  var tweetObjectStore = db_holder.db.transaction("tweets", "readwrite").objectStore("tweets");
  tweetObjectStore.put(tweet_data);
}


// TODO: Make sure button is added to new tweets that are loaded onto screen as well
function tweet_buttons() {

  // Construction of abuse button
  var $li_abusive = $('<li>', {"class": "button-abusive", "role": "presentation"});
  var $button_abusive = $('<button>', {"class": "dropdown-link", "type": "button", "role": "menuitem", "text": "Mark Tweet Abusive"});
  $li_abusive.append($button_abusive);

  // Construction of benign button
  var $li_benign = $('<li>', {"class": "button-benign", "role": "presentation"});
  var $button_benign = $('<button>', {"class": "dropdown-link", "type": "button", "role": "menuitem", "text": "Mark Tweet Benign"});
  $li_benign.append($button_benign);

  // Adding buttons to tweet dropdown menu
  var $ul = $('.ProfileTweet-action > .dropdown > .dropdown-menu > ul');
  $ul.prepend($li_abusive);
  $ul.prepend($li_benign);

  var $abusive = $('.button-abusive');
  $abusive.click({abusive: 1}, store_tweet);

  var $benign = $('.button-benign')
  $benign.click({abusive: 0}, store_tweet);
}
