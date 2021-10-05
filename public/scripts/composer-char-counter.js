$(document).ready(function() {
  // --- our code goes here ---
  console.log("it works")

  // const $tweetText = $(".tweet-text");
  // console.log($tweetText.length)



  $("#tweet-text").on('input', function(){
    let count = $(this).val().length
    console.log(count);
 
    $('.bottom-of-form .counter').text(140 - count);

    if( count > 140){
      $('.bottom-of-form .counter').addClass("redCounter")
    }else {
      $('.bottom-of-form .counter').removeClass("redCounter")
    }
  });

 

});

