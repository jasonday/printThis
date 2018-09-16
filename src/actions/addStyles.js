/**
 *
 * @param {document} sourceDocument
 * @return {{href: *, media: (*|string)}[]}
 */
const getLinkedStylesheets = (sourceDocument = document) => {
  return Array.from(sourceDocument.querySelectorAll("link[rel=stylesheet]"))
    .filter(el => !el.disabled)
    .filter(el => el.href !== undefined)
    .map(el => ({
      href: el.href,
      media: el.media || "all",
    }));
};

/**
 * @param {document} sourceDocument
 * @return {string[]}
 */
const getLinksAsText = (sourceDocument = document) => getLinkedStylesheets(sourceDocument)
  .map(link => `<link rel="stylesheet" href="${link.href}" media="${link.media}">`);

/**
 * @param {document} sourceDocument
 * @return {HTMLElement[]}
 */
const getLinksAsTags = (sourceDocument = document) => getLinkedStylesheets(sourceDocument)
  .map(link => {
    const el = sourceDocument.createElement('link');
    el.href = link.href;
    el.media = link.media;
    return el;
  });

/**
 * @param {object} options
 * @param {document} sourceDocument
 * @param {document} targetDocument
 * @return {document}
 */
const addStyleLinks = (options, sourceDocument, targetDocument) => {
  if (options.importCSS) {
    const head = targetDocument.getElementsByTagName('head')[0];
    getLinksAsTags(sourceDocument).forEach(tag => head.appendChild(tag));
  }
  return targetDocument;
};

/**
 * @param {document} sourceDocument
 * @return {{text: string}[]}
 */
const getStyleTags = (sourceDocument = document) => {
  return Array.from(sourceDocument.getElementsByTagName("style"))
    .filter(el => !el.disabled)
    .map(el => ({
      text: el.textContent,
    }));
};

/**
 * @param {document} sourceDocument
 * @return {string[]}
 */
const getStyleTagsAsText = (sourceDocument = document) => getStyleTags(sourceDocument)
  .map(style => `<style>${style.text}</style>`);


/**
 * @param {document} sourceDocument
 * @return {HTMLElement[]}
 */
const getStyleTagsAsTags = (sourceDocument = document) => getStyleTags(sourceDocument)
  .map(style => {
    const el = sourceDocument.createElement('style');
    el.textContent = style.text;
    return el;
  });

/**
 * @param {object} options
 * @param {document} sourceDocument
 * @param {document} targetDocument
 * @return {document}
 */
const addStyleTags = (options, sourceDocument, targetDocument) => {
  if (options.importStyle) {
    const head = targetDocument.getElementsByTagName('head')[0];
    getStyleTagsAsTags(sourceDocument).forEach(tag => head.appendChild(tag));
  }
  return targetDocument;
};

/**
 * Makes an HTML <link> tag for the provided CSS url
 * @param {string} url
 * @return {HTMLElement}
 */
const makeLinkTag = (url) => {
  const link = document.createElement('link');
  link.rel="stylesheet";
  link.href = url;
  return link;
};

/**
 * @param {object} options
 * @param {document} targetDocument
 * @return {document}
 */
const loadCSS = (options, targetDocument) => {
  if (options.loadCSS) {
    const head = targetDocument.getElementsByTagName('head')[0];
    const urls = Array.isArray(options.loadCSS) ? options.loadCSS : [options.loadCSS];
    urls.map(makeLinkTag).forEach(tag => head.appendChild(tag));
  }

  return targetDocument;
};

/**
 * CSS variables are stored on the html tag when dynamically applied
 * e.g.  document.documentElement.style.setProperty("--foo", bar);
 * @param {object} options
 * @param {document} sourceDocument
 * @param {document} targetDocument
 * @return {document}
 */
const addCssVariables = (options, sourceDocument, targetDocument) => {
  // TODO: Add a config for this?
  const srcCssText = targetDocument.getElementsByTagName('html')[0].style.cssText;
  const targetHtml = targetDocument.getElementsByTagName('html')[0];

  targetHtml.style.cssText = srcCssText;
  return targetDocument;
};

export {
  getLinkedStylesheets,
  getLinksAsText,
  getLinksAsTags,
  addStyleLinks,
  getStyleTags,
  getStyleTagsAsText,
  getStyleTagsAsTags,
  addStyleTags,
  makeLinkTag,
  loadCSS,
  addCssVariables,
};
