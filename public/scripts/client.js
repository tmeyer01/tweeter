/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


$(document).ready(function() {


  //Event listener for sumbit button when posting tweet
  $("form").on("submit", function(event) {
    event.preventDefault();
    
    //defining the count from the value entered in from text area with the id of tweet-text
    let count = $("#tweet-text").val().length
    
    //validation to make sure count is not over 140, or no characters
    if(count > 140) {
      alert("Character count must be less then 140 character");
      return;
    } 
    if (count === 0) {
      alert("Cant not submit blank tweeter");
      return;
    } 

      const tweet = $(this).serialize();
      console.log(tweet);
      $.ajax({
        type: "POST",
        url: "/tweets/",
        datatype: 'json',
        data: tweet,
      });
    
  });

  

  //Function creates new tweet-container and fills it with approrate data from data array object
  const createTweetElement = function(tweetObj) {
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
    return $tweet;
  };
  //fuction that filter through array of tweets and for each item runs creatTweetElment() then appends them to the tweetContainer 
  const renderTweets = function(arrayOfTweet) {
    const $tweetContainer = $('#tweets-container');
    for (let item of arrayOfTweet) {
      $tweetContainer.append(createTweetElement(item));
    }
  };


  const loadTweets = function(){
    let url = 'http://localhost:8080/tweets';
    $.ajax({
      url: url,
      method: "GET"
    })
    .then((result)=>{
      //console.log('results', results);
      renderTweets(result);
    })
    .catch((error)=>{
      console.log('error: ', error)
    });
  };

  loadTweets();

});
