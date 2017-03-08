/**
 * Created on 2/4/17.
 * Proposal for eliminating timeouts using readystatechange and postMessage
 */

function printThisIframe() {
    // print is blocking, so the postMessage should fire when it is done.
    window.print();
    parent.postMessage('printThisDone');
}

if (document.readyState === 'complete') {
    printThisIframe();
} else {
    document.onreadystatechange = function () {
        if (document.readyState === 'complete') {
            printThisIframe();
        }
    };
}
