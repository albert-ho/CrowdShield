// This is what our customer data looks like.
const customerData = [
  { ssn: "444-44-4444", name: "Bill", age: 35, email: "bill@company.com" },
  { ssn: "555-55-5555", name: "Donna", age: 32, email: "donna@home.org" }
];

const dbName = "tweet_test";

var request = indexedDB.open(dbName, 0);

request.onerror = function(event) {
  alert("OH NO, ERROR!");
  alert(event);
};

request.onupgradeneeded = function(event) {
  var db = event.target.result;

  // Create an objectStore to hold information about our customers. We're
  // going to use "ssn" as our key path because it's guaranteed to be
  // unique - or at least that's what I was told during the kickoff meeting.
  var objectStore = db.createObjectStore("tweets", { keyPath: "id" });

  /*
  // Create an index to search customers by name. We may have duplicates
  // so we can't use a unique index.
  objectStore.createIndex("name", "name", { unique: false });

  // Create an index to search customers by email. We want to ensure that
  // no two customers have the same email, so use a unique index.
  objectStore.createIndex("email", "email", { unique: true });

  // Use transaction oncomplete to make sure the objectStore creation is
  // finished before adding data into it.
  objectStore.transaction.oncomplete = function(event) {
    // Store values in the newly created objectStore.
    var customerObjectStore = db.transaction("customers", "readwrite").objectStore("customers");
    for (var i in customerData) {
      customerObjectStore.add(customerData[i]);
    }
  };
  */
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
