$(document).ready(function() {
 
  $("#tweet-text").on('input', function(){
    let count = $(this).val().length
    
    $('.bottom-of-form .counter').text(140 - count);

    if( count > 140){
      $('.bottom-of-form .counter').addClass("redCounter")
    }else {
      $('.bottom-of-form .counter').removeClass("redCounter")
    }
  });

});

