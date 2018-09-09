/**
 *
 * @param {object} [options]
 * @param {document} [sourceDocument]
 * @return {*}
 */
const getBaseUrl = (options = {}, sourceDocument = document) => {
  const base = sourceDocument.getElementsByTagName('base')[0];
  let baseURL;

  // add base tag to ensure elements use the parent domain
  if (options.base === true && base !== undefined) {
    // take the base tag from the original page
    baseURL = base.href;
  } else if (typeof options.base === "string") {
    // An exact base string is provided
    baseURL = options.base;
  } else {
    // Use the page URL as the base
    baseURL = sourceDocument.location.protocol + "//" + sourceDocument.location.host;
  }

  return baseURL;
};

/**
 * Get <base> tag as a string
 * @param {string} url
 * @return {string}
 */
const getBaseString = (url) => `<base href="${url}">`;

/**
 * Get <base> tag as an element
 * @param {string} url
 * @param {document} [sourceDocument]
 * @return {HTMLElement}
 */
const getBaseTag = (url, sourceDocument = document) => {
  const tag = sourceDocument.createElement('base');
  tag.href = url;
  return tag;
};

export {
  getBaseString,
  getBaseTag,
  getBaseUrl,
};
