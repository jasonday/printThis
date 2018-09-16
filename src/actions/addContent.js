import fragmentFromString from '../utilities';

/**
 *
 * @param {*} content
 * @param {document} targetDocument
 * @param {function} action
 * @return {document} targetDocument
 */
const addContent = (
  content,
  targetDocument,
  action = targetDocument.body.append.bind(targetDocument.body),
) => {
  if (content instanceof DocumentFragment) {
    action(content);
  } else if (content instanceof Element) {
    action(content.cloneNode(true));
  } else if (typeof content === 'string' && content !== '') {
    action(fragmentFromString(content));
  } else if (Array.isArray(content)) {
    content.forEach(tag => addContent(options, targetDocument, tag, action));
  }

  return targetDocument;
};

const addFooter = (options, targetDocument) => addContent(
  options.footer,
  targetDocument,
  targetDocument.body.append.bind(targetDocument.body),
);

// TODO: prepend not supported by IE 11
// https://developer.mozilla.org/en-US/docs/Web/API/ParentNode/prepend
const addHeader = (options, targetDocument) => addContent(
  options.header,
  targetDocument,
  targetDocument.body.prepend.bind(targetDocument.body),
);

export {
  addContent,
  addFooter,
  addHeader,
};
