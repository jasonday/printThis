/**
 *
 * @param {object} [options]
 * @param {document} [sourceDocument]
 * @param {document} [targetDocument]
 * @return {document} targetDocument
 */
const addTitle = (options, sourceDocument, targetDocument) => {
  if (options.title === true) {
    targetDocument.title = sourceDocument.title;
  } else if (options.title) {
    targetDocument.title = options.title;
  }

  return targetDocument;
};

export {
  addTitle,
};
