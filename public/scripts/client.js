/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


$(document).ready(function() {
  
 

//   const tweetData = {
//     "user": {
//       "name": "Newton",
//       "avatars": "https://i.imgur.com/73hZDYK.png",
//         "handle": "@SirIsaac"
//       },
//     "content": {
//         "text": "If I have seen further it is by standing on the shoulders of giants"
//       },
//     "created_at": 1461116232227
//  }

const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
]






 const createTweetElement = function (tweetObj) {
  let time = timeago.format(`${tweetObj.created_at}`);

  const $tweet = $(`
    <section class="tweet-container">
          <artical class="tweet-header">
            <div id="icon-and-name">
              <img src="${tweetObj.user.avatars}">
              <span>${tweetObj.user.name}</span>  
            </div>
            <span id="user-handel">${tweetObj.user.handle}</span>
          </artical>
          <artical class="tweet-body">
            <span class="tweet">${tweetObj.content.text}</span>
          </artical>
          <artical class="tweet-footer">
            <span class="date-tweeted">${time}</span>
            <div class="icon-holder">
              <i class="fas fa-flag icons"></i>
              <i class="fas fa-retweet icons"></i>
              <i class="far fa-heart icons"></i>
            </div>
          </artical>
    </section>`
  );
  return $tweet
 };
 




  const renderTweets = function (arrayOfTweet) {
    const $tweetContainer = $('#tweets-container')
    for (let item of arrayOfTweet) {
      
      $tweetContainer.append(createTweetElement(item));
    }
  
  
  };


  renderTweets(data);

 //const $tweet = createTweetElement(tweetData);

 // Test / driver code (temporary)
 //console.log($tweet); // to see what it looks like
 //$('#tweets-container').append($tweet); // to add it to the page so we can make sure it's got all the right elements, classes, etc.



});
