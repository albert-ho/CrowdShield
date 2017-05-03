function getTarget() {
  return $('.ProfileCard')[0].attributes['data-screen-name'].value;
}

const dbName = getTarget();

var request = indexedDB.open(dbName, 0);

request.onerror = function(event) {
  alert("OH NO, ERROR!");
  alert(event);
};

request.onupgradeneeded = function(event) {
  var db = event.target.result;
  var objectStore = db.createObjectStore("tweets", { keyPath: "id" });
  objectStore.transaction.oncomplete = function(event) {
    // Store values in the newly created objectStore.
    var customerObjectStore = db.transaction("customers", "readwrite").objectStore("customers");
    for (var i in customerData) {
      customerObjectStore.add(customerData[i]);
    }
  };
};


function store_tweets() {
  var tweetObjectStore = db.transaction("tweets", "readwrite").objectStore("tweets");
  $('.tweet-text, .abp_processed').each(function(i, node) {
      highLevelTweet = node.parentNode.parentNode.parentNode;
      var id = highLevelTweet.attributes['data-tweet-id'].value;
      var text = node.textContent;
      tweet = {id: id, text: text};
      tweetObjectStore.add(tweet);
  })
};
