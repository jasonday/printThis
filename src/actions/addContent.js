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
  action = targetDocument.body.append.bind(targetDocument.body)
) => {
  if (content instanceof DocumentFragment) {
    // TODO: Add DocumentFragment
  } else if (content instanceof Element) {
    // TODO: Clone and insert element
  } else if (typeof content === 'string' && content !== '') {
    // TODO: Add string as HTML
    // https://stackoverflow.com/questions/9284117/inserting-arbitrary-html-into-a-documentfragment
    // RangeElement supports IE11 natively.
  } else if (Array.isArray(content)) {
    // TODO: Call this function recursively with the elements of the array.
    content.forEach(tag => addContent(options, targetDocument, tag));
  }

  return targetDocument;
};

const addFooter = (options, targetDocument) => addContent(
  options.header,
  targetDocument,
  targetDocument.body.append.bind(targetDocument.body),
);

const addContent = (options, targetDocument) => addContent(
  options.header,
  targetDocument,
  targetDocument.body.prepend.bind(targetDocument.body),
);

export {
  addContent,
  addFooter,
  addContent,
};
