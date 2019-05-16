const defaults = {
  debug: false,
  importCSS: true,
  importStyle: false,
  printContainer: true,
  loadCSS: "",
  pageTitle: "",
  removeInline: false,
  removeInlineSelector: "*",
  printDelay: 333,
  header: null,
  footer: null,
  base: false,
  formValues: true,
  canvas: true,
  doctypeString: "<!DOCTYPE html>",
  removeScripts: true,
  copyTagClasses: false,
  beforePrintEvent: null,
  beforePrint: null,
  afterPrint: null
};

// Provide v1 overrides if desired
const oldDefaults = {
  canvas: false,
  removeScripts: false,
};

