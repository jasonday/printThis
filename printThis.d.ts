interface JQuery {
    printThis(args?: IPrintThisOptions);
}

interface IPrintThisOptions {
    /**
     * show the iframe for debugging
     * default value: false
     */
    debug?: boolean,

    /**
     * import parent page css
     * default value: true
     */
    importCSS?: boolean,

    /**
     * import style tags
     * default value: false
     */
    importStyle?: boolean,

    /**
     * print outer container/$.selector
     * default value: true
     */
    printContainer?: boolean,

    /**
     * path to additional css file - use an array [] for multiple
     */
    loadCSS?: string,

    /**
     * add title to print page
     */
    pageTitle?: string,

    /**
     * remove inline styles from print elements
     * default value: false
     */
    removeInline?: boolean,

    /**
     * custom selectors to filter inline styles. removeInline must be true
     * default value: "*"
     */
    removeInlineSelector?: string,

    /**
     * prefix to html
     */
    header?: JQuery | string,

    /**
     * postfix to html
     */
    footer?: JQuery | string,

    /**
     * preserve the BASE tag or accept a string for the URL
     * default value: false
     */
    base?: boolean | string,

    /**
     * preserve input/form values
     * default value: true
     */
    formValues?: boolean,

    /**
     * copy canvas content
     * default value: false
     */
    canvas?: boolean,

    /**
     * remove script tags from print content
     * default value: false
     */
    removeScripts?: boolean,

    /**
     * copy classes from the html & body tag
     * default value: false
     */
    copyTagClasses?: boolean,

    /**
     * callback function for printEvent in iframe
     */
    beforePrintEvent?: Function,

    /**
     * function called before iframe is filled
     */
    beforePrint?: Function,

    /**
     * function called before iframe is removed
     */
    afterPrint?: Function
}
