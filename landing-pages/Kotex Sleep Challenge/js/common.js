$(function(){
  $('#productCarousel').carousel({
    interval: 3000
  });

  $('#photoCarousel').carousel({
    interval: 3000
  });

  $('#photoCarousel-sm').carousel({
    interval: 3000
  });

  $('#videoCarousel').carousel({
    interval: false
  });

  $('#videoCarousel-btn').click(function() {
    $('#videoCarousel').carousel('next');
  });
});