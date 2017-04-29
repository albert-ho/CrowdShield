// Called when the user clicks on the browser action.s
chrome.browserAction.onClicked.addListener(function(tab){

  var user = prompt("Enter user name (e.g. barackobama)");
  var start = prompt("Enter start time in specific format (yyyy-mm-dd)");
  var end = prompt("Enter end time in specific format (yyyy-mm-dd)");

  var query = "https://twitter.com/search?l=&q=";
  query += "to:" + user + " since:" + start + " until:" + end;
  twitterURL = encodeURI(query);

  chrome.tabs.create({url: twitterURL}, function(tab) {
    console.log("loaded!");
    chrome.tabs.executeScript(tab.id, {file: "src/inject.js", });
  });
});
