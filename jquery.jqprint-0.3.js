// -----------------------------------------------------------------------
// Print This
//
// Based on jPrintArea: http://plugins.jquery.com/project/jPrintArea
// and jqprint: https://github.com/tanathos/jquery.jqprint
//------------------------------------------------------------------------

(function($) {
    var opt;

    $.fn.printThis = function (options) {
        opt = $.extend({}, $.fn.printThis.defaults, options);

        var $element = (this instanceof jQuery) ? this : $(this);

        if ($.browser.opera)
        {
            var tab = window.open("","Print Preview");
            tab.document.open();

            var doc = tab.document;
        }
        else
        {
            var $iframe = $("<iframe  />");

            if (!opt.debug) { $iframe.css({ position: "absolute", width: "0px", height: "0px", left: "-600px", top: "-600px" }); }

            $iframe.appendTo("body");
            var doc = $iframe[0].contentWindow.document;
        }

        if (opt.importCSS)
        {
			$("link[rel=stylesheet]").each(function(){
           		var href = $(this).attr('href');
           		if(href){
					var media = $(this).attr('media') || 'all';
					doc.write("<link type='text/css' rel='stylesheet' href='" + href + "' media='"+media+"'>");
				}
            });
        }

        if (opt.printContainer) { doc.write($element.outer()); }
        else { $element.each( function() { doc.write($(this).html()); }); }

        doc.close();

        (opt.operaSupport && $.browser.opera ? tab : $iframe[0].contentWindow).focus();
        setTimeout( function() { (opt.operaSupport && $.browser.opera ? tab : $iframe[0].contentWindow).print(); if (tab) { tab.close(); } }, 1000);
    }

    $.fn.printThis.defaults = {
		debug: false,
		importCSS: true,
		printContainer: true
	};

    
    jQuery.fn.outer = function() {
      return $($('<div></div>').html(this.clone())).html();
    }
})(jQuery);