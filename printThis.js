/**
 * printThis v2.0.0
 * @desc Printing plug-in for jQuery
 * @author Jason Day
 *
 * Resources (based on) :
 *              jPrintArea: http://plugins.jquery.com/project/jPrintArea
 *              jqPrint: https://github.com/permanenttourist/jquery.jqprint
 *              Ben Nadal: http://www.bennadel.com/blog/1591-Ask-Ben-Print-Part-Of-A-Web-Page-With-jQuery.htm
 *
 * Licensed under the MIT licence:
 *              http://www.opensource.org/licenses/mit-license.php
 *
 * (c) Jason Day 2015
 *
 * Usage:
 *
 *  $("#mySelector").printThis({
 *      debug: false,               * show the iframe for debugging
 *      importCSS: true,            * import page CSS
 *      importStyle: false,         * import style tags
 *      printContainer: true,       * grab outer container as well as the contents of the selector
 *      loadCSS: "path/to/my.css",  * path to additional css file - us an array [] for multiple
 *      pageTitle: "",              * add title to print page
 *      removeInline: false,        * remove all inline styles from print elements
 *      printDelay: 333,            * variable print delay
 *      header: null,               * prefix to html
 *      base: false,                * preserve the BASE tag, or accept a string for the URL
 *      formValues: true            * preserve input/form values
 *  });
 *
 * Notes:
 *  - the loadCSS will load additional css (with or without @media print) into the iframe, adjusting layout
 */

;
(function($) {

    // Like constants
    var SPECIAL_INPUTS = '[type="checkbox"],[type="radio"]';

    /**
     * Add doctype to fix the style difference between printing and render
     * @param {jQuery} $iframe
     * @param {string} doctype
     */
    function setDocType($iframe, doctype){
        var win, doc;
        win = $iframe.get(0);
        win = win.contentWindow || win.contentDocument || win;
        doc = win.document || win.contentDocument || win;
        doc.open();
        doc.write(doctype);
        doc.close();
    }

    // Small runOnce wrapper
    // IE calls load multiple times as we manipulate the contents of the iframe.
    function runOnce(fn) {
        var result;

        return function(){
            if (result) {
                return result;
            }

            result = fn.apply(this, arguments);
            return result;
        };
    }

    function getFrameName() {
        return "printThis-" + (new Date()).getTime();
    }

    /**
     * Setup Older IE (Before 10)
     * @returns {jQuery}
     */
    function setupOldIE() {
        // Ugly IE hacks due to IE not inheriting document.domain from parent
        // checks if document.domain is set by comparing the host name against document.domain
        var iframeSrc = 'javascript:document.write(\'<head><script>document.domain="' + document.domain + '";</script></head><body></body>\')';
        var printI = document.createElement('iframe');

        printI.name = "printIframe";
        printI.id = getFrameName();
        printI.className = "MSIE";

        document.body.appendChild(printI);
        printI.src = iframeSrc;

        return $(printI);
    }

    function setupOldIELoadEvent($iframe, loadFunction) {
        var printI = $iframe.get(0);

        if (printI.attachEvent){
            printI.attachEvent("onload", loadFunction);
        } else {
            printI.onload = loadFunction;
        }
    }

    function setupModernBrowser() {
        // other browsers inherit document.domain, and IE works if document.domain is not explicitly set
        var $iframe = $("<iframe id='" + getFrameName() + "' name='printIframe' />");
        $iframe.appendTo("body");

        return $iframe;
    }

    function setupModernBrowserLoadEvent($iframe, loadFunction) {

        $iframe[0].addEventListener('load', loadFunction);
    }

    function hideIframe($iframe) {
        $iframe.css({
            position: "absolute",
            width: "0px",
            height: "0px",
            left: "-600px",
            top: "-600px"
        });
    }

    function getBaseURL(opt) {
        var $base = $('base'),
            baseURL;

        // add base tag to ensure elements use the parent domain
        if (opt.base === true && $base.length > 0) {
            // take the base tag from the original page
            baseURL = $base.attr('href');
        } else if (typeof opt.base === 'string') {
            // An exact base string is provided
            baseURL = opt.base;
        } else {
            // Use the page URL as the base
            baseURL = document.location.protocol + '//' + document.location.host;
        }

        return baseURL;
    }

    function captureGenericInputValues($doc, inputType, $inputList) {
        // loop through selects
        if ($inputList.length) {
            $inputList.each(function() {
                var $this = $(this);

                $doc.find(inputType + '[name="' + $this.attr('name') + '"]').val($this.val());
            });
        }
    }

    function captureCheckableInputValues($doc, $inputList) {
        // loop through inputs
        if ($inputList.length) {
            $inputList.each(function() {
                var $this = $(this),
                    name = $this.attr('name'),
                    $iframeInput = $doc.find('input[name="' + name + '"]'),
                    value = $this.val();

                if ($this.is(':checked')) {
                    if ($this.is(':checkbox')) {
                        $iframeInput.attr('checked', 'checked');
                    } else if ($this.is(':radio')) {
                        $doc.find('input[name="' + name + '"][value=' + value + ']').attr('checked', 'checked');
                    }
                }
            });
        }
    }

    function captureFormValues($doc, $element) {
        captureGenericInputValues($doc, 'select', $element.find('select'));
        captureGenericInputValues($doc, 'textarea', $element.find('textarea'));
        captureGenericInputValues($doc, 'input', $element.find('input').not(SPECIAL_INPUTS));
        captureCheckableInputValues($doc, $element.find('input').filter(SPECIAL_INPUTS));
    }

    function removeInlineStyles($doc) {

        // $.removeAttr available jQuery 1.7+
        if ($.isFunction($.removeAttr)) {
            $doc.find("body *").removeAttr("style");
        } else {
            $doc.find("body *").attr("style", "");
        }
    }

    $.fn.printThis = function(options) {
        var opt = $.extend({}, $.fn.printThis.defaults, options),
            $element = this instanceof jQuery ? this : $(this),
            isOldIE = (window.location.hostname !== document.domain && navigator.userAgent.match(/msie/i)),
            $iframe = isOldIE ? setupOldIE() : setupModernBrowser(),
            loadedCallback = runOnce(iFrameLoaded);


        if (isOldIE) {
            setupOldIELoadEvent($iframe, loadedCallback);
        } else {
            setupModernBrowserLoadEvent($iframe, loadedCallback);
        }

        // show frame if in debug mode
        if (!opt.debug) hideIframe($iframe);

        // $iframe.ready() and $iframe.load were inconsistent between browsers    
        function iFrameLoaded() {

            if (opt.doctypeString){
                setDocType($iframe, opt.doctypeString);
            }

            var $doc = $iframe.contents(),
                $head = $doc.find("head"),
                $body = $doc.find("body");

            $head.append('<base href="' + getBaseURL(opt) + '">');

            // import page stylesheets
            if (opt.importCSS) $("link[rel=stylesheet]").each(function() {
                var href = $(this).attr("href");
                if (href) {
                    var media = $(this).attr("media") || "all";
                    $head.append("<link type='text/css' rel='stylesheet' href='" + href + "' media='" + media + "'>");
                }
            });
            
            // import style tags
            if (opt.importStyle) $("style").each(function() {
                $(this).clone().appendTo($head);
            });

            // add title of the page
            if (opt.pageTitle) $head.append("<title>" + opt.pageTitle + "</title>");

            // import additional stylesheet(s)
            if (opt.loadCSS) {
               if( $.isArray(opt.loadCSS)) {
                    jQuery.each(opt.loadCSS, function(index, value) {
                       $head.append("<link type='text/css' rel='stylesheet' href='" + this + "'>");
                    });
                } else {
                    $head.append("<link type='text/css' rel='stylesheet' href='" + opt.loadCSS + "'>");
                }
            }

            // print header
            if (opt.header) $body.append(opt.header);

            // grab $.selector as container
            if (opt.printContainer) $body.append($element.outer());

            // otherwise just print interior elements of container
            else $element.each(function() {
                $body.append($(this).html());
            });

            // capture form/field values
            if (opt.formValues) {
                captureFormValues($doc, $element);
            }

            // remove inline styles
            if (opt.removeInline) {
                removeInlineStyles($doc);
            }

            setTimeout(function() {
                var contentWindow;

                if (isOldIE) {
                    // check if the iframe was created with the ugly hack
                    // and perform another ugly hack out of necessity
                    window.frames["printIframe"].focus();
                    $head.append("<script>  window.print(); </script>");
                } else {
                    // proper method
                    contentWindow = $iframe.get(0).contentWindow;

                    if (document.queryCommandSupported("print")) {
                        contentWindow.document.execCommand("print", false, null);
                    } else {
                        contentWindow.focus();
                        contentWindow.print();
                    }
                }

                // remove iframe after print
                if (!opt.debug) {
                    setTimeout(function() {
                        $iframe.remove();
                    }, 1000);
                }

            }, opt.printDelay);

        }

    };

    // defaults
    $.fn.printThis.defaults = {
        debug: false,           // show the iframe for debugging
        importCSS: true,        // import parent page css
        importStyle: false,     // import style tags
        printContainer: true,   // print outer container/$.selector
        loadCSS: "",            // load an additional css file - load multiple stylesheets with an array []
        pageTitle: "",          // add title to print page
        removeInline: false,    // remove all inline styles
        printDelay: 333,        // variable print delay
        header: null,           // prefix to html
        formValues: true,       // preserve input/form values
        base: false,            // preserve the BASE tag, or accept a string for the URL
        doctypeString: '<!DOCTYPE html>' // html doctype
    };

    // $.selector container
    jQuery.fn.outer = function() {
        return $($("<div></div>").html(this.clone())).html();
    };
})(jQuery);

