//dragdrop
(function($) {
	$.fn.dragdrop = function(eventobj)
	{
		var moveobj  = this;
		var mouseup = function (e) 
		{
			$(document).unbind("mousemove", mousemove);
			$(document).unbind("mouseup", mouseup);
			return false;
		}
	    var mousemove = function (e) 
		{
			var position = e.data;
			e.pageX = Math.max(0, Math.min(e.pageX, $(window).width()));
			e.pageY = Math.max(0, Math.min(e.pageY, $(window).height()));
			var newleft  = e.pageX - position.left;
			var newtop   = e.pageY - position.top;
			$(moveobj).css("left", newleft + "px");
			$(moveobj).css("top",  newtop + "px");
		}
        var mousedown = function (e) {
			var left = e.pageX - $(this).offset().left;
			var top  = e.pageY - $(this).offset().top;
			$(document).bind('mousemove', {left: left, top: top} , mousemove);
			$(document).bind('mouseup', mouseup);
			return false;
		}
		$(eventobj).bind('mousedown', mousedown);
	};
})(jQuery);


/*! Copyright (c) 2009 Brandon Aaron (http://brandonaaron.net)
 * Dual licensed under the MIT (http://www.opensource.org/licenses/mit-license.php)
 * and GPL (http://www.opensource.org/licenses/gpl-license.php) licenses.
 * Thanks to: http://adomas.org/javascript-mouse-wheel/ for some pointers.
 * Thanks to: Mathias Bank(http://www.mathias-bank.de) for a scope bug fix.
 *
 * Version: 3.0.2
 * 
 * Requires: 1.2.2+
 */

(function($) {

var types = ['DOMMouseScroll', 'mousewheel'];

$.event.special.mousewheel = {
	setup: function() {
		if ( this.addEventListener )
			for ( var i=types.length; i; )
				this.addEventListener( types[--i], handler, false );
		else
			this.onmousewheel = handler;
	},

	teardown: function() {
		if ( this.removeEventListener )
			for ( var i=types.length; i; )
				this.removeEventListener( types[--i], handler, false );
		else
			this.onmousewheel = null;
	}
};

$.fn.extend({
	mousewheel: function(fn) {
		return fn ? this.bind("mousewheel", fn) : this.trigger("mousewheel");
	},
	
	unmousewheel: function(fn) {
		return this.unbind("mousewheel", fn);
	}
});


function handler(event) {
	var args = [].slice.call( arguments, 1 ), delta = 0, returnValue = true;
	
	event = $.event.fix(event || window.event);
	event.type = "mousewheel";
	
	if ( event.wheelDelta ) delta = event.wheelDelta/120;
	if ( event.detail     ) delta = -event.detail/3;
	
	// Add events and delta to the front of the arguments
	args.unshift(event, delta);

	return $.event.handle.apply(this, args);
}

})(jQuery);
