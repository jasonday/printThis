
<a href="https://badge.fury.io/js/print-this"><a href="https://opencollective.com/printThis" ><img src="https://opencollective.com/printThis/all/badge.svg?label=financial+contributors" alt="Financial Contributors on Open Collective"/></a> <img src="https://badge.fury.io/js/print-this.svg" alt="npm version" height="18" align="right"></a>

# printThis
Printing plug-in for vanilla JavaScript
#### [Try the demo](https://jasonday.github.io/printThis/)

> [!CAUTION]
> printThis 3.0 drops the jQuery dependency. Initiating the library utilizes new syntax, although the options remain the same. 


## Features
* Print specific & multiple DOM elements
* Preserve page CSS/styling
** or add new CSS; the world is your oyster!
* Preserve form entries
* Canvas support


## Vanilla JS Usage
### Basic
```javascript
printThis('selector');
```

### Advanced Features
```javascript
printThis('#kitty-one, #kitty-two, #kitty-three', {
    importCSS: false,
    loadCSS: "",
    header: "<h1>Look at all of my kitties!</h1>"
});
```

### Troubleshooting
[Check the printThis wiki for common issues and questions](https://github.com/jasonday/printThis/wiki)

*Covers common issues related to styling and printing limitations regarding page breaks*


### Options
Now with TypeScript definitions.

#### debug
Debug leaves the iframe visible on the page after `printThis` runs, allowing you to inspect the markup and CSS.

#### importCSS
Copy CSS `<link>` tags to the printThis iframe. On by default.

#### importStyle
Copy CSS `<style>` tags to the printThis iframe. On by default.

#### printContainer
Includes the markup of the selected container, not just its contents. On by default.

#### loadCSS
Provide a URL for an additional stylesheet to the printThis iframe. Empty string (off) by default.

#### pageTitle
Use a custom page title on the iframe. This may be reflected on the printed page, depending on settings. Blank by default.

#### removeInline
Eliminates any inline style attributes from the content. Off by default.

#### removeInlineSelector
Filter which inline style attributes to remove. Requires `removeInline` to be true.
Accepts custom CSS/jQuery selectors. Default is `"*"`

#### header & footer
A string or object to prepend or append to the printThis iframe content. `null` by default.

```javascript
printThis("#mySelector", {
    header: "<h1>Amazing header</h1>"
});
```


#### base
The `base` option allows several behaviors.
By default it is `false`, meaning a the current document will be set as the base URL.  

If set to `true`, a `<base>` attribute will be set if one exists on the page.
If none is found, the tag is omitted, which may be suitable for pages with Fully Qualified URLs.

When passed as a string, it will be used as the `href` attribute of a `<base>` tag.

#### formValues
This setting copies the current values of form elements into the printThis iframe. On by default.

#### canvas
Canvas elements will be copied to the printThis iframe 
and you can call printThis directly on a canvas element if you choose.

#### removeScripts
Deletes script tags from the content to avoid errors or unexpected behavior during print. Disabled by default.

#### copyTagClasses: true
Copies classes from the body and html tags into the printThis iframe.  
Accepts `true`, `"b"`, `"h"`, or `"bh"` to test for `"b"` and `"h"` for body and html tags, respectively.

#### copyTagStyles: true
Copies style attributes from the body and html tags into the printThis iframe.
Added to provide support for CSS Variables.
Accepts `true`, `"b"`, `"h"`, or `"bh"` to test for `"b"` and `"h"` for body and html tags, respectively.  

#### beforePrintEvent: null
Function to run inside the iframe before the print occurs.  
*This function has not been validated on all browsers.*

#### beforePrint: null
Function called before the iframe is populated with content.

#### afterPrint: null
Function called after the print and before the iframe is removed from the page.  
This is called even if `debug: true`, which does not remove the iframe.

### All Options
```javascript
printThis("#mySelector", {
    debug: false,               // show the iframe for debugging
    importCSS: true,            // import parent page css
    importStyle: false,         // import style tags
    printContainer: true,       // print outer container
    loadCSS: "",                // path to additional css file - use an array [] for multiple
    pageTitle: "",              // add title to print page
    removeInline: false,        // remove inline styles from print elements
    removeInlineSelector: "*",  // custom selectors to filter inline styles. removeInline must be true
    header: null,               // prefix to html
    footer: null,               // postfix to html
    base: false,                // preserve the BASE tag or accept a string for the URL
    formValues: true,           // preserve input/form values
    canvas: false,              // copy canvas content
    removeScripts: false,       // remove script tags from print content
    copyTagClasses: false,      // copy classes from the html & body tag
    beforePrintEvent: null,     // function for printEvent in iframe
    beforePrint: null,          // function called before iframe is filled
    afterPrint: null            // function called before iframe is removed
});
```

## Please read
* "It's not working" without any details is not a valid issue and will be closed
* A url, or html file, is necessary to debug. Due to the complexities of printing and this plugin, an example is the best way to debug
* When troubleshooting, set `debug: true` and inspect the iframe. Please report your findings when reporting an issue
* Every user should be active in the debugging process

## Contributors

### Code Contributors

This project exists thanks to all the people who contribute. [[Contribute](CONTRIBUTING.md)].
<a href="https://github.com/jasonday/printThis/graphs/contributors"><img src="https://opencollective.com/printThis/contributors.svg?width=890&button=false" /></a>

### Financial Contributors

Become a financial contributor and help us sustain our community. [[Contribute](https://opencollective.com/printThis/contribute)]

#### Individuals

<a href="https://opencollective.com/printThis"><img src="https://opencollective.com/printThis/individuals.svg?width=890"></a>

#### Organizations

Support this project with your organization. Your logo will show up here with a link to your website. [[Contribute](https://opencollective.com/printThis/contribute)]
