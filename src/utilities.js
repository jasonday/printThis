const isOldIE = () => {
  const isBrowser = typeof navigator !== "undefined";

  if (!isBrowser) {
    return false;
  }

  return /msie/i.test(navigator.userAgent);
};

const getNodes = (selector, fragment = document) => {
  // Easy path first
  if (util.hasDSA()) {
    return Array.from(fragment.querySelectorAll(seletor));
  }

  /*
   * TODO: Add jQuery support. Can we do this in a way that doesn't use the global?
   * Perhaps pass jQuery to this function from the jQuery plugin?
   */

  // Error out if we can't run.
  throw new Error('Support is limited to recent browsers. https://caniuse.com/#feat=queryselector');
};

const getNow = () => Date.now === undefined ? new Date().getTime() : Date.now();

const hasDSA = () => !!(document && document.querySelectorAll);

const removeNode = node => node.parentNode && node.parentNode.removeChild(node);

const fragmentFromString = (html) => {
  var tmpl = document.createElement('template');
  tmpl.innerHTML = html;
  if (tmpl.content === undefined || tmpl.content === null){ // ie11
    var fragment = document.createDocumentFragment();
    var isTableEl = /^[^\S]*?<(t(?:head|body|foot|r|d|h))/i.test(html);
    tmpl.innerHTML = isTableEl ? '<table>'+html : html;
    var els        = isTableEl ? tmpl.querySelector(RegExp.$1).parentNode.childNodes : tmpl.childNodes;
    while(els[0]) fragment.appendChild(els[0]);
    return fragment;
  }
  return tmpl.content;
};

export {
  fragmentFromString,
  getNodes,
  getNow,
  hasDSA,
  isOldIE,
  removeNode,
};
