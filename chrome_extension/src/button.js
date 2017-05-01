function button_tweets() {
  $('.ProfileTweet-action > .dropdown > .dropdown-menu > ul').each(function(i, node) {
      node.append(
        $('<li>').append(
          $('<button>').attr('type', 'button').attr('role', 'menuitem').text('twitterbert button')
      ));
  })
}
button_tweets();
