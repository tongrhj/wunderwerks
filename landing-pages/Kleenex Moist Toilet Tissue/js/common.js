$(function(){
  $('.carousel').carousel({
    interval: 3000
  });

  $('#menu-btn').click(function () {
    $('#navbar').slideToggle('fast');
    // $('.navbar-backdrop').toggleClass('in');
    // $('.navbar-backdrop').toggle();
    // $('.navbar-collapse').click(function () {
    //   $('.navbar-backdrop').toggleClass('in');
    //   $('.navbar-backdrop').toggle();
    // })
	});
});
