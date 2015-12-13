$(document).ready(function(){
	$.ajaxSetup({ cache: false });
});

window.addEventListener("load",function() {

	setTimeout(function(){
		// Hide the address bar!
		window.scrollTo(0, 1);
	}, 0);

});