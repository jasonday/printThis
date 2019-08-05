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
    if (content instanceof HTMLCanvasElement) {
      const srcData = content.getImageData(0, 0, content.canvas.width, content.canvas.height);
      const newNode = content.cloneNode(true);
      newNode.getContext("2d").drawImage(content, 0, 0);
      return newNode;
    }
    return content.cloneNode(true);
  }

  // Fail?
  return undefined;
};

const cloneCanvas = (node) => {
  // TODO - canvas needs to find canvas entries and match source and destination..
};

