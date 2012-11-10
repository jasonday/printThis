// -----------------------------------------------------------------------
// Print This
//
// Based on jPrintArea: http://plugins.jquery.com/project/jPrintArea
// and jqprint: https://github.com/tanathos/jquery.jqprint
//------------------------------------------------------------------------

(function ($) {
	$.fn.printThis = function (options) {
		//Merge defaults and options
		options = $.extend({}, $.fn.printThis.defaults, options);
		
		if($.browser.opera) {
			$.printThis.operaBrowser.call(this, options);
		}
		else {
			$.printThis.allBrowsers.call(this, options);
		}
		
		//return for chainability
		return this;
	};

	//private methods
	$.printThis = {
		//returns the String for the given options
		_getCSSStyles: function (element, options) {
			//get jqeury dom element
			var $element = (element instanceof jQuery) ? element : $(element),
				_styleStr = ''; //holds the style/html string

			//if importCss is true then get the style sheet links from page
			if(options.importCSS) {
				$("link[rel=stylesheet]").each(function () {
					var $this = $(this),
						_href = $this.attr('href');
					if(_href) {
						var _media = $this.attr('media') || 'all';
						_styleStr += "<link type='text/css' rel='stylesheet' href='" + _href + "' media='" + _media + "'>";
					}
				});
			}

			//append external link if available
			if(options.loadCSS) {
				_styleStr += "<link type='text/css' rel='stylesheet' href='" + options.loadCSS + "'>";
			}

			//
			if(options.printContainer) {
				_styleStr += $element.outer();
			}
			else {
				$element.each(function () {
					_styleStr += $(this).html();
				});
			}

			return _styleStr;
		},

		//Print functionality for Opera Browsers ONLY, not using any iframe
		operaBrowser: function (options) {
			var tab = window.open("", "Print Preview");
			tab.document.open();
			var doc = tab.document;
			doc.write($.printThis._getCSSStyles(this, options));
			doc.close();
			tab.focus();
			setTimeout(function () {
				tab.print();
				tab.close();
			}, 1000);
		},

		//print functionality for all other browsers except opera
		allBrowsers: function (options) {
			//get unique iframe name
			var strFrameName = ("printThis-" + (new Date()).getTime()),
				//holds style/html string 
				styleStr = $.printThis._getCSSStyles(this, options);
			
			//create an iframe
            var $iframe = $("<iframe name=" + strFrameName +"/>");
			
            if (!options.debug) { $iframe.css({ position: "absolute", width: "0px", height: "0px", left: "-600px", top: "-600px" }); }
			//append iframe to body
            $iframe.appendTo("body");
			//append stylestr to iframe
            $($iframe[0].contentWindow.document).find('body').append(styleStr);
			
			$iframe[0].contentWindow.focus();
			setTimeout(function () {					
					$iframe[0].contentWindow.print();
			}, 1000);

			//removed iframe after 60 seconds
			setTimeout(
			function () {
				$iframe.remove();
			}, (60 * 1000));
		}
	};

	// Default settings
	$.fn.printThis.defaults = {
		debug: false,
		importCSS: true,
		printContainer: true,
		loadCSS: ""
	};

	jQuery.fn.outer = function () {
		return $($('<div></div>').html(this.clone())).html();
	}
})(jQuery);