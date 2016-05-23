
//-----------------------------------------------------
// ANIMATION - Adds support for CS3 Animations
// Check if element is visible after scrolling
//-----------------------------------------------------	

function animate_scrolled_into_view(elem,animation,time_to_delay){
	// If an anmiated class has already beed added, then skip it.
	if ($(elem).is('.slideUp, .slideDown, .slideLeft, .slideRight, .fadeIn')) { 
		//console.log('skip');
	}else{
	
		var offset = 0; // Off set from bottom of screen
		var offset_large = $(window).height() - 700; // Offset for tall images.
		//console.log('Window Height '+$(window).height())
		
		var docViewTop = $(window).scrollTop(); // top of window position
		//console.log('Window Top '+docViewTop)
		
		var docViewBottom = docViewTop + $(window).height(); // bottom of window position
		//console.log('Window Bottom '+docViewBottom)
	
		var elemTop = $(elem).offset().top; // Top of element position
		//console.log(elem.selector + ' Top '+elemTop) 
		
		var elemBottom = elemTop + $(elem).height(); // bottom of element position
		//console.log(elem.selector + ' Height '+$(elem).height())
		//console.log(elem.selector + ' Bottom '+elemBottom)
	
		//console.log("----------------------------");
		
		/*
		Caveat:	We are working with a numbered positions so if X has highter numbered pos (100) than Y does(50), it actually has a lower phyisial position on the screen.
				If the top of the windows position is 100 is X has a position of 150, it means that X is lower on the page than the top of the window.
		
			1) IF the bottom of element is physically lower than the top of the Window.
				> e.g. Bottom elem = 100 and the top of window is 50, means bottom of elem has a lower physical position than the top of window
				> This could happen when the element bottom enters from the top of the window.
				
			2) IF the top of element is physically higher than the bottom of (the Window + offset).
				> e.g. Top elem = 100 and the bottom of window is 150, means top of elem is above the bottom of the window
				> This could happen when the element top enteres from the bottom of the window.
			
			#3 and #4 ensure that the entire element is inside the window so the animation won't kick in until the whole thing is visible and between the top and bottom of the window.
			
			3) IF the bottom of the element is above the bottom of the screen.
				> e.g. bottom of elem = 100 and bottom of window = 150, means bottom of elem is above the bottom of the window
				> This could happen when the element bottom enteres from the bottom of the window.
			
			4) IF the top of the element is lower than the top of the window.
				> e.g. top of elem = 100 and top of window = 50, means top of elem is lower than the top of the window
				> This could happen when the element top enteres from the top of the window.
				
			#5 & #6	For the edge case where the elem is taller than the window, so at one point the top is above the window and bottom is below.
				To resovle this we use offset, to prompt the elme to animate once we know its top or bottom is into the screen deep enough to be animated.
			
			5) IF top of elem is above (bottom of window - large offset)
			
			6) If bottom of elem is below (top of window + large offest) */
		
	
		if(((elemBottom >= docViewTop) && (elemTop <= docViewBottom-offset) && (elemBottom <= docViewBottom-offset) &&  (elemTop >= docViewTop)) ||
			((elemTop <= docViewBottom-offset_large) && (elemBottom >= docViewTop+offset_large))){
			  
			  setTimeout(
			  function() 
			  {
				//console.log(elem.selector);
				$(elem).addClass(animation);
			  }, time_to_delay);
			  
		  }
	}
 
};


//-----------------------------------------------------
// Detect if touch device via modernizr, return true
//-----------------------------------------------------	
function is_touch_device(checkScreenSize){

	if (typeof checkScreenSize === "undefined" || checkScreenSize === null) { 
    	checkScreenSize = true; 
	}

	var deviceAgent = navigator.userAgent.toLowerCase();
	
	/*
	var is_windows = false;
	if (navigator.platform.toLowerCase().indexOf("win") !== -1){
		console.log("its windows")
		var is_windows = true;
	};
	var isTouch = (Modernizr.touch && !is_windows) ||  
	*/
		 
	//var isTouch = false || 
	var isTouch = Modernizr.touch || 
		(deviceAgent.match(/(iphone|ipod|ipad)/) ||
		deviceAgent.match(/(android)/)  || 
		deviceAgent.match(/iphone/i) || 
		deviceAgent.match(/ipad/i) || 
		deviceAgent.match(/ipod/i) || 
		deviceAgent.match(/blackberry/i));
	
	if(checkScreenSize){
		var isMobileSize = Modernizr.mq('(max-width:767px)');
	}else{
		var isMobileSize = false;
	}
	
	if(isTouch || isMobileSize ){
		return true;
	}

	return false;
}

function disable_animation_for_mobile() {	
	//console.log('Disable touch for mobile');
	// Detect and set isTouch for touch screens
	var isTouchAnimation = is_touch_device(false);
	if(isTouchAnimation){ 
		$(".hide-animation").removeClass("hide-animation");
		//$.each.removeClass("hide-animation");
	}
};


$(window).load(function($) {
	// Disable animation for mobile.
	disable_animation_for_mobile();
});
 