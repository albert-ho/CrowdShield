function button_tweets() {
  var $li = $('<li>', {"class": "twitterbert-button", "role": "presentation"});
  var $button = $('<button>', {"class": "dropdown-link", "type": "button", "role": "menuitem"}).text("TESTING123");
  var $ul = $('.ProfileTweet-action > .dropdown > .dropdown-menu > ul');
  $li.append($button);
  $ul.prepend($li);
}
