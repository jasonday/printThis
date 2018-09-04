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

export {
  getNodes,
  getNow,
  hasDSA,
  isOldIE,
  removeNode,
};
