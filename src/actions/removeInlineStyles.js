import { getNodes } from "../utilities";

const removeInlineStyle = (fragment, selector) => {
  const nodes = getNodes(selector, fragment);

  Array.from(nodes)
    .forEach(node => node.hasAttribute('style') && node.removeAttribute('style'));

  return fragment;
};

const options = () => ({
  removeInline: false,            // remove all inline styles from print elements
  removeInlineSelector: "*",      // custom selectors to filter inline styles. removeInline must be true
});

const action = (options, document, fragment) => {
  if (options.removeInline === true) {
    removeInlineStyle(fragment, options.removeInlineSelector);
  }
  return fragment;
};

export {
  action,
  options,
};
