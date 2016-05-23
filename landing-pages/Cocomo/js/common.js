$(function(){
    $('.carousel').carousel({
		interval: 3000
    });
	 
	 
	 $('#menu-btn').click(function () {
		$('#navbar').slideToggle("fast");
	});
});
