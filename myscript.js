$(document).ready(function(){

//source: https://www.w3schools.com/howto/tryit.asp?filename=tryhow_css_smooth_scroll_jquery
    $("a").click(function(){
      if (this.hash !== "") {
        event.preventDefault();
        var hash = this.hash;
  
        $('html, body').animate({
          scrollTop: $(hash).offset().top
        }, 700, function(){
          window.location.hash = hash;
        });
      } 
    });

    //source: http://jsfiddle.net/MFUw3/239/
    $(window).scroll(function() {

      if ($(this).scrollTop()>650)
       {
          $('#name').hide();
          $('.header-links').hide();
       }
      else
       {
        $('#name').show();
        $('.header-links').show();
       }
   });
  
    
});