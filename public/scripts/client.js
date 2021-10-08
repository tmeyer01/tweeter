/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {
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
      </section>`);
    return $tweet;
  };

  //fuction that filter through array of tweets and for each item runs creatTweetElment() then pre-appends (that apending but backwards) them to the tweetContainer
  const renderTweets = function(arrayOfTweet) {
    const $tweetContainer = $("#tweets-container");
    //$tweetContainer.empty()
    for (let item of arrayOfTweet) {
      // console.log('item', item)
      $tweetContainer.prepend(createTweetElement(item));
    }
  };

  //function that loadTweets by mkaing an Ajax request call with a GET method
  const loadTweets = function() {
    let url = "http://localhost:8080/tweets";

    $.ajax({
      url: url,
      method: "GET",
    })
      .then((result) => {
        //console.log('results', result);
        $("#tweets-container").empty();
        renderTweets(result);
      })
      .catch((error) => {
        console.log("error: ", error);
      });
  };
  $(".error-container").hide();
  loadTweets();

  //Event listener for sumbit button when posting tweet
  $("form").on("submit", function(event) {
    event.preventDefault();

    //text veriable holds value of from tweet-text id
    const text = $("#tweet-text").val();
    console.log("text value", text);
    const count = text.length;
    //using escape func. on text to prevent XXS w/ Escaping
    const safeTextFromUser = escape(text);

    $(".error-container").empty();

    //validation to make sure count is not over 140, or no characters
    if (count > 140) {
      //console.log('selector', $("#error-container-no-error"))
      $(".error-container").append(
        "<strong>Character count must be less then 140 character</strong>"
      );
      $(".error-container").slideDown(function() {});
      return;
    }
    if (count === 0) {
      $(".error-container").append(
        "<strong>Cant not submit blank tweet</strong>"
      );
      $(".error-container").slideDown(function() {});
      return;
    }
    $(".error-container").slideUp(function() {});

    //formating varible into json
    const tweet = { text: safeTextFromUser };
    console.log(tweet);
    $.ajax({
      type: "POST",
      url: "/tweets/",
      datatype: "json",
      data: tweet,
      success: () => {
        // console.log("HELLO")
        $("#tweet-text").val("");
        loadTweets();
      },
    });
  });

  const escape = function(str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };
});
