var clean_twitter = function() {
  var ugly = [];
  ugly.push('.action-reply-container');
  ugly.push('.action-rt-container');
  ugly.push('.action-del-container');
  ugly.push('.action-fav-container');
  ugly.push('.more-tweet-actions');
  console.log("ugly is " + ugly);

  for (var i = 0; i < ugly.length; i++) {
    var u = $(ugly[i]).find('b');
    u.text('');
    console.log(u);
  }
}
