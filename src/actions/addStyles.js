const getLinkedStylesheets = (sourceDocument = document) => {
  return Array.from(sourceDocument.querySelectorAll("link[rel=stylesheet]"))
    .filter(el => !el.disabled)
    .filter(el => el.href !== undefined)
    .map(el => ({
      href: el.href,
      media: el.media || "all",
    }));
};

const getLinksAsText = (sourceDocument = document) => getLinkedStylesheets(sourceDocument)
  .map(link => `<link rel="stylesheet" href="${link.href}" media="${link.media}">`);

const getLinksAsTags = (sourceDocument = document) => getLinkedStylesheets(sourceDocument)
  .map(link => {
    const el = sourceDocument.createElement('link');
    el.href = link.href;
    el.media = link.media;
    return el;
  });

const addStyleLinks = (options, sourceDocument, targetDocument) => {
  if (options.importCSS) {
    const head = targetDocument.getElementsByTagName('head')[0];
    getLinksAsTags(sourceDocument).forEach(tag => head.appendChild(tag));
  }
  return targetDocument;
};

const getStyleTags = (sourceDocument = document) => {
  return Array.from(sourceDocument.getElementsByTagName("style"))
    .filter(el => !el.disabled)
    .map(el => ({
      text: el.textContent,
    }));
};

const getStyleTagsAsText = (sourceDocument = document) => getLinkedStylesheets(sourceDocument)
  .map(style => `<style>${style.text}</style>`);

const getStyleTagsAsTags = (sourceDocument = document) => getLinkedStylesheets(sourceDocument)
  .map(style => {
    const el = sourceDocument.createElement('style');
    el.textContent = style.text;
    return el;
  });

const addStyleTags = (options, sourceDocument, targetDocument) => {
  if (options.importStyle) {
    const head = targetDocument.getElementsByTagName('head')[0];
    getStyleTagsAsTags(sourceDocument).forEach(tag => head.appendChild(tag));
  }
  return targetDocument;
};

//
// // add title of the page
// if (opt.pageTitle) $head.append("<title>" + opt.pageTitle + "</title>");
//
// // import additional stylesheet(s)
// if (opt.loadCSS) {
//   if ($.isArray(opt.loadCSS)) {
//     jQuery.each(opt.loadCSS, function() {
//       $head.append(
//         "<link type='text/css' rel='stylesheet' href='" + this + "'>"
//       );
//     });
//   } else {
//     $head.append(
//       "<link type='text/css' rel='stylesheet' href='" + opt.loadCSS + "'>"
//     );
//   }
// }
//
// var pageHtml = $("html")[0];
//
// // CSS VAR in html tag when dynamic apply e.g.  document.documentElement.style.setProperty("--foo", bar);
// $doc.find("html").prop("style", pageHtml.style.cssText);
