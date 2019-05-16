
/**
 * Attach event handler function to beforePrint event
 * @param {Element} iframe
 * @param {Function} beforePrintHandler
 */
function attachOnBeforePrintEvent(iframe, beforePrintHandler) {
  const win = iframe.contentWindow || iframe.contentDocument || iframe;

  if (typeof beforePrintHandler === "function") {
    if ("matchMedia" in win) {
      win.matchMedia("print").addListener(function(mql) {
        if (mql.matches) beforePrintHandler();
      });
    } else {
      win.onbeforeprint = beforePrintHandler;
    }
  }
}


