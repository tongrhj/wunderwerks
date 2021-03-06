$(function(){
    $('.carousel').carousel({
		interval: 3000
    });
	 
	 
	$('#menu-btn').click(function () {
		$('#navbar').slideToggle("fast");
	});
	//inputValueSet();
	$('.radioDiv>div').click(function (index) {
		$('input:radio[name=attendAs]').attr('checked',false);
		$('.radioDiv>div').removeClass('selected');
		$(this).addClass('selected');
		var curIndex = Number($(this).index());
		//console.log(curIndex);		
		$('input:radio[name=attendAs]:nth('+curIndex+')').attr('checked',true);

		//var Id = $(this).find('input[type=radio]').attr('id');
		var Id = $('input:radio[name=attendAs]:nth('+curIndex+')').attr('id');
		//console.log(Id);
		document.getElementById(Id).click();

	});

	$('a').click(function(){
		$('html, body').animate({
			scrollTop: $($(this).attr('rel') ).offset().top
		}, 500);
		return false;
	});
	
});

function inputValueSet(){
	//$('input:radio[name=attendAs]')
	$('input:radio[name=attendAs]').each(function(index){
		//console.log("checked"+$(this));
		if ($(this).is(':checked')) {
			var curIndex = Number($(this).index());
			//console.log("checked: "+curIndex);
			$('.radioDiv>div:nth('+curIndex+')').addClass('selected');
		}
		var thisIndex = $(this).index();
		//$('.radioDiv>div').removeClass('selected');
		//$('.radioDiv>div:nth('+thisIndex+')').addClass('selected');
	});
	$('input[type="text"]').each(function(){
		if( $(this).val().length >= 1) {
			$(this).addClass('active');
			
		}
	});
	$('input[type="text"]').blur(function() {
		if( $(this).val().length >= 1) {
			$(this).addClass('active');
		}
		else {
			$(this).removeClass('active');
		}
	});
}
$(document).ready(function(){
    inputValueSet();
});


(function ($, window, delay) {
  // http://jsfiddle.net/AndreasPizsa/NzvKC/
  var theTimer = 0;
  var theElement = null;
    var theLastPosition = {x:0,y:0};
  $('[data-toggle]')
    .closest('li')
    .on('mouseenter', function (inEvent) {
    if (theElement) theElement.removeClass('open');
    window.clearTimeout(theTimer);
    theElement = $(this);

    theTimer = window.setTimeout(function () {
      theElement.addClass('open');
    }, delay);
  })
    .on('mousemove', function (inEvent) {
        if(Math.abs(theLastPosition.x - inEvent.ScreenX) > 4 || 
           Math.abs(theLastPosition.y - inEvent.ScreenY) > 4)
        {
            theLastPosition.x = inEvent.ScreenX;
            theLastPosition.y = inEvent.ScreenY;
            return;
        }
        
    if (theElement.hasClass('open')) return;
    window.clearTimeout(theTimer);
    theTimer = window.setTimeout(function () {
      theElement.addClass('open');
    }, delay);
  })
    .on('mouseleave', function (inEvent) {
    window.clearTimeout(theTimer);
    theElement = $(this);
    theTimer = window.setTimeout(function () {
      theElement.removeClass('open');
    }, delay);
  });
})(jQuery, window, 200); // 200 is the delay in milliseconds