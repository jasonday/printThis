const copyContent = (content, withFormData) => {

  // If jQuery use jQuery
  if (content.jquery) {
    // Calls clone(withDataAndEvents = true) to copy form values.
    return content.clone(withFormData);
  }

  // If Array, recurse
  if (Array.isArray(content)) {
    return content.map(v => copyContent(v, withFormData));
  }

  // If NodeList
  if (content instanceof NodeList) {
    return copyContent(Array.from(content), withFormData);
  }

  // If Node, deep clone
  if (content instanceof Node) {
    return content.cloneNode(true);
  }

  // Fail?
  return undefined;
};


