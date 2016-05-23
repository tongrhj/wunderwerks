/*
Learn How to Read, Parse and Display XML Data in Random Order with jQuery
Author: Kevin Liew
Website: http://www.queness.com
*/
var html = '';
var counter = 1;
XMLLIST = {

	//general settings
	xml: '../cocomo/data.xml?' + Math.random(0,1), //solve ie weird caching issue
	display: '6', //number of items to be displayed
	random: true, //display randomly {true|false}
	appendTo: '#PartnersList', //set the id/class to insert XML data
	
	init: function () {
	
		//jQuery ajax call to retrieve the XML file
		$.ajax({
			type: "GET",
	    	url: XMLLIST.xml,
	   		dataType: "xml",	   		
	   	 	success: XMLLIST.parseXML
	  	});	
	
	}, // end: init()
	
	parseXML: function (xml) {
	
		//Grab every single ITEM tags in the XML file
		var data = $('item', xml).get();
		//Allow user to toggle display randomly or vice versa
		var list = (XMLLIST.random) ? XMLLIST.randomize(data) : data;
		var i = 1;
		
		//Loop through all the ITEMs
				
		$(list).each(function () {
			
			//Parse data and embed it with HTML					

			XMLLIST.insertHTML($(this));
			//If it reached user predefined total of display item, stop the loop, job done.
			//if (i == XMLLIST.display) return false;
			i++;
		});
		
		$(html).appendTo(XMLLIST.appendTo);

	
	}, // end: parseXML()

	insertHTML: function (item) {

		//retrieve each of the data field from ITEM
		var url = item.find('url').text();
		var image = item.find('image').text();
		var title = item.find('title').text();
		var desc = item.find('desc').text();	

		addItemDivStart = (counter%7);
		addItemDivEnd = (counter%6);

		if(addItemDivStart == 0 || counter == 1){
			pItemStart = true;
		}else{
			pItemStart = false;
		}
		if(addItemDivEnd == 0){
			pItemEnd = true;
		}else{
			pItemEnd = false;
		}
		if(pItemStart == true){
			if(counter == 1){
				html += '<div class="item active">';
			}else{
				html += '<div class="item">';
			}
		}
		//Embed them into HTML code				
		html += '<div class="col-sm-4">';		
		//html += '<a href="' + url + '"><img src="' + image + '" alt="' + title + '" />';
		html += '<img src="' + image + '" alt="' + title + '" />';
		html += '<p>' + title + '</p>';
		html += '<p class="small">' + desc + '</p>';
		html += '</div>';		
		//html += '</div>';

		if(pItemEnd == true){
			html += '</div>';
		}
		//Append it to user predefined element
		//$(html).appendTo(XMLLIST.appendTo);
		//counter++:
		counter++;
		
	}, // end: insertHTML()

    
	randomize: function(arr) {
  		
  		//randomize the data
  		//Credit to JSFromHell http://jsfromhell.com/array/shuffle
	    for(var j, x, i = arr.length; i; j = parseInt(Math.random() * i), x = arr[--i], arr[i] = arr[j], arr[j] = x);
		    return arr;
  
  	} // end: randomize()    
  	

}

//Run this script
XMLLIST.init();
