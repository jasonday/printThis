#printThis
Printing plug-in for jQuery

## Features
* Print specific & multiple DOM elements
* Preserve page CSS/styling
** or add new CSS; the world is your oyster!
* Preserve form entries

### Non-features
really 'Issues'
* canvas/svg elements such as map routes are not preserved

## Usage
### Basic
```javascript
    $('selector').printThis();
```

### Advanced
    $('#kitty-one, #kitty-two, #kitty-three').printThis({
        importCSS: false,
        loadCSS: "",
        header: "<h1>Look at all of my kitties!</h1>"
    });

### All Options
```javascript
    $("#mySelector").printThis({
        debug: false,               * show the iframe for debugging
        importCSS: true,            * import page CSS
        importStyle: false,         * import style tags
        printContainer: true,       * grab outer container as well as the contents of the selector
        loadCSS: "path/to/my.css",  * path to additional css file - us an array [] for multiple
        pageTitle: "",              * add title to print page
        removeInline: false,        * remove all inline styles from print elements
        printDelay: 333,            * variable print delay; depending on complexity a higher value may be necessary
        header: null,               * prefix to html
        formValues: true            * preserve input/form values
    });
```

## Please read
* "It's not working" without any details is not a valid issue and will be closed
* A url, or html file, is neccessary to debug. Due to the complexities of printing and this plugin, an example is the best way to debug
* When troubleshooting, set `debug: true` and inspect the iframe
* Every user should be active in the debugging process

## ToDo:
* Look at more efficient form field value persist
* Look at alternative to setTimeout ($.deferred?)
              


