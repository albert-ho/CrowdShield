
/*function test_tweets() {
  $('.tweet-text, .abp_processed').each(function(i, node) {
      highLevelTweet = node.parentNode.parentNode.parentNode;
      var id = highLevelTweet.attributes['data-tweet-id'].value;
      var text = node.textContent;
      tweet = {id: id, text: text};
      //alert(tweet.id + ': ' + tweet.text);
  })
}*/

function test_tweet(event) {
  var tweet = event.target.closest('.tweet');
  var id = tweet.attributes['data-tweet-id'].value;
  var text = tweet.getElementsByClassName('tweet-text')[0].textContent;
  var date = tweet.getElementsByClassName('tweet-timestamp')[0].getAttribute('title');
  var tweet_data = {id: id, text: text, date: date};
  alert( "id: " + tweet_data.id + " text: " + tweet_data.text + " data: " + tweet_data.date);
}


// TODO: Make sure button is added to new tweets that are loaded onto screen as well
function button_tweets() {

  var $li = $('<li>', {"class": "twitterbert-button", "role": "presentation"});
  var $button = $('<button>', {"class": "dropdown-link", "type": "button", "role": "menuitem", "text": "TESTING123"});
  $li.append($button);

  var $ul = $('.ProfileTweet-action > .dropdown > .dropdown-menu > ul');
  $ul.prepend($li);

  $button = $('.twitterbert-button');
  $button.click(test_tweet);
}
