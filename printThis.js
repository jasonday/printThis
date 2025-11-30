
(function(window) {
    'use strict';

    function populatePrintContainer(destination, elements, settings) {
        if (settings.header) {
            destination.innerHTML += settings.header;
        }

        elements.forEach(element => {
            const content = element.cloneNode(true);

            if (settings.formValues) {
                const formElements = element.querySelectorAll('input, textarea, select');
                const clonedFormElements = content.querySelectorAll('input, textarea, select');

                formElements.forEach((formElement, index) => {
                    const clonedElement = clonedFormElements[index];
                    if (formElement.tagName === 'INPUT') {
                        if (formElement.type === 'checkbox' || formElement.type === 'radio') {
                            clonedElement.checked = formElement.checked;
                        } else {
                            clonedElement.value = formElement.value;
                        }
                    } else if (formElement.tagName === 'TEXTAREA') {
                        clonedElement.value = formElement.value;
                    } else if (formElement.tagName === 'SELECT') {
                        clonedElement.value = formElement.value;
                    }
                });
            }

            if (settings.removeScripts) {
                content.querySelectorAll('script').forEach(script => script.remove());
            }

            if (settings.printContainer) {
                destination.appendChild(content);
            } else {
                Array.from(content.children).forEach(child => destination.appendChild(child));
            }
        });

        if (settings.canvas) {
            let canvasId = 0;
            elements.forEach(element => {
                element.querySelectorAll('canvas').forEach(canvas => {
                    canvas.setAttribute('data-printthis-canvas', canvasId++);
                });
            });

            destination.querySelectorAll('canvas').forEach((canvas, index) => {
                 const originalCanvas = document.querySelector(`[data-printthis-canvas="${index}"]`);
                 if(originalCanvas) {
                    canvas.getContext('2d').drawImage(originalCanvas, 0, 0);
                    originalCanvas.removeAttribute('data-printthis-canvas');
                 }
            });
        }

        if (settings.footer) {
            destination.innerHTML += settings.footer;
        }
    }

    function printThis(selector, options) {

        const defaults = {
            debug: false,
            importCSS: true,
            importStyle: true,
            printContainer: true,
            loadCSS: "",
            pageTitle: "",
            removeInline: false,
            removeInlineSelector: "*",
            header: null,
            footer: null,
            base: false,
            formValues: true,
            canvas: true,
            removeScripts: false,
            copyTagClasses: true,
            copyTagStyles: true,
            beforePrintEvent: null,
            beforePrint: null,
            afterPrint: null,
            useAlternativePrinting: true
        };

        const settings = Object.assign({}, defaults, options);
        const elements = document.querySelectorAll(selector);

        if (settings.useAlternativePrinting) {
            const printContainer = document.createElement('div');
            printContainer.id = 'printThis-container';

            const printStyle = document.createElement('style');
            printStyle.innerHTML = `
                @media print {
                    body > *:not(#printThis-container) {
                        display: none !important;
                    }
                    #printThis-container {
                        display: block !important;
                    }
                }
            `;
            document.head.appendChild(printStyle);

            populatePrintContainer(printContainer, elements, settings);

            document.body.appendChild(printContainer);

            const images = printContainer.querySelectorAll('img');
            const imagePromises = [...images].map(img => {
                return new Promise(resolve => {
                    // Check if the image is already loaded
                    if (img.complete) {
                        resolve();
                    } else {
                        img.onload = resolve;
                        img.onerror = resolve;
                    }
                });
            });

            Promise.all(imagePromises).then(() => {
                if (typeof settings.beforePrint === "function") {
                    settings.beforePrint();
                }

                const afterPrintHandler = () => {
                    if (typeof settings.afterPrint === "function") {
                        settings.afterPrint();
                    }

                    if (!settings.debug) {
                        printContainer.remove();
                        printStyle.remove();
                    }
                    // Remove the event listener to avoid memory leaks
                    window.removeEventListener('afterprint', afterPrintHandler);
                };

                window.addEventListener('afterprint', afterPrintHandler);
                window.print();
            });

        } else {
            const frameId = "printThis-" + (new Date()).getTime();
            const iframe = document.createElement('iframe');

            iframe.id = frameId;
            iframe.name = 'printIframe';
            iframe.setAttribute('style', 'position:absolute;width:0;height:0;left:-600px;top:-600px;');

            document.body.appendChild(iframe);

            iframe.onload = () => {
                if (settings.debug) {
                    iframe.style.left = '10px';
                    iframe.style.top = '10px';
                    iframe.style.width = '800px';
                    iframe.style.height = '600px';
                    iframe.style.border = '1px solid #ccc';
                    iframe.style.backgroundColor = 'white';
                }

                if (typeof settings.beforePrint === "function") {
                    settings.beforePrint();
                }

                const doc = iframe.contentWindow.document;
                const head = doc.head;
                const body = doc.body;

                let baseURL = '';
                if (settings.base === true && document.querySelector('base')) {
                    baseURL = document.querySelector('base').href;
                } else if (typeof settings.base === 'string') {
                    baseURL = settings.base;
                } else {
                    baseURL = document.location.protocol + '//' + document.location.host;
                }
                head.innerHTML += `<base href="${baseURL}">`;

                if (settings.pageTitle) {
                    head.innerHTML += `<title>${settings.pageTitle}</title>`;
                }

                if (settings.importCSS) {
                    document.querySelectorAll('link[rel="stylesheet"]').forEach(link => {
                        head.appendChild(link.cloneNode(true));
                    });
                }

                if (settings.importStyle) {
                    document.querySelectorAll('style').forEach(style => {
                        head.appendChild(style.cloneNode(true));
                    });
                }

                if (settings.loadCSS) {
                    if (Array.isArray(settings.loadCSS)) {
                        settings.loadCSS.forEach(file => {
                            const link = document.createElement('link');
                            link.type = 'text/css';
                            link.rel = 'stylesheet';
                            link.href = file;
                            head.appendChild(link);
                        });
                    } else {
                        const link = document.createElement('link');
                        link.type = 'text/css';
                        link.rel = 'stylesheet';
                        link.href = settings.loadCSS;
                        head.appendChild(link);
                    }
                }

                const pageHtml = document.documentElement;
                if (settings.copyTagClasses === true || settings.copyTagClasses === 'h' || settings.copyTagClasses === 'bh') {
                     doc.documentElement.className = pageHtml.className;
                }
                 if (settings.copyTagClasses === true || settings.copyTagClasses === 'b' || settings.copyTagClasses === 'bh') {
                    body.className = document.body.className;
                }

                if (settings.copyTagStyles === true || settings.copyTagStyles === 'h' || settings.copyTagStyles === 'bh') {
                    doc.documentElement.style.cssText = pageHtml.style.cssText;
                }

                if (settings.copyTagStyles === true || settings.copyTagStyles === 'b' || settings.copyTagStyles === 'bh') {
                    body.style.cssText = document.body.style.cssText;
                }

                populatePrintContainer(body, elements, settings);

                if (settings.removeInline) {
                    body.querySelectorAll(settings.removeInlineSelector).forEach(el => {
                        el.removeAttribute('style');
                    });
                }

                if (typeof settings.beforePrintEvent === 'function') {
                    const win = iframe.contentWindow;
                    if ('matchMedia' in win) {
                        win.matchMedia('print').addEventListener('change', (mql) => {
                            if (mql.matches) settings.beforePrintEvent();
                        });
                    } else {
                        win.onbeforeprint = settings.beforePrintEvent;
                    }
                }

                const assets = [...doc.querySelectorAll('link'), ...doc.querySelectorAll('img')];
                const assetPromises = assets.map(asset => {
                    return new Promise(resolve => {
                        asset.onload = resolve;
                        asset.onerror = resolve;
                    });
                });

                let printing = false;
                const print = () => {
                    if (!printing) {
                        printing = true;
                        iframe.contentWindow.focus();
                        iframe.contentWindow.print();
                    }
                };

                const timeout = setTimeout(print, 1000);

                Promise.all(assetPromises).then(() => {
                    clearTimeout(timeout);
                    print();
                });

                iframe.contentWindow.onafterprint = () => {
                    if (!settings.debug) {
                        document.body.removeChild(iframe);
                    }
                    if (typeof settings.afterPrint === "function") {
                        settings.afterPrint();
                    }
                };
            };
        }
    }
    window.printThis = printThis;
}(window));
