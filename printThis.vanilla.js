
(function(window) {
    'use strict';

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
            afterPrint: null
        };

        const settings = Object.assign({}, defaults, options);
        const elements = document.querySelectorAll(selector);
        const frameId = "printThis-" + (new Date()).getTime();
        const iframe = document.createElement('iframe');

        iframe.id = frameId;
        iframe.name = 'printIframe';
        iframe.setAttribute('style', 'position:absolute;width:0;height:0;left:-600px;top:-600px;');

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


            if (settings.header) {
                body.innerHTML += settings.header;
            }

            elements.forEach(element => {
                const content = element.cloneNode(true);

                if (settings.formValues) {
                    const textareas = element.querySelectorAll('textarea');
                    const clonedTextareas = content.querySelectorAll('textarea');
                    for(let i = 0; i < textareas.length; i++) {
                        clonedTextareas[i].value = textareas[i].value;
                    }

                    const selects = element.querySelectorAll('select');
                    const clonedSelects = content.querySelectorAll('select');
                     for(let i = 0; i < selects.length; i++) {
                        clonedSelects[i].value = selects[i].value;
                    }

                    const inputs = element.querySelectorAll('input');
                    const clonedInputs = content.querySelectorAll('input');
                    for(let i = 0; i < inputs.length; i++) {
                        if(inputs[i].type === "checkbox" || inputs[i].type === "radio") {
                            clonedInputs[i].checked = inputs[i].checked;
                        } else {
                            clonedInputs[i].value = inputs[i].value;
                        }
                    }
                }

                if (settings.removeScripts) {
                    content.querySelectorAll('script').forEach(script => script.remove());
                }

                if (settings.printContainer) {
                     body.appendChild(content);
                } else {
                     Array.from(content.children).forEach(child => body.appendChild(child));
                }


                if (settings.canvas) {
                    let canvasId = 0;
                    const canvases = element.querySelectorAll('canvas');
                    canvases.forEach(canvas => {
                        canvas.setAttribute('data-printthis', canvasId++);
                    });

                    const clonedCanvases = body.querySelectorAll('canvas');
                    clonedCanvases.forEach(canvas => {
                        const cid = canvas.getAttribute('data-printthis');
                        const originalCanvas = document.querySelector(`[data-printthis="${cid}"]`);
                        canvas.getContext('2d').drawImage(originalCanvas, 0, 0);
                        originalCanvas.removeAttribute('data-printthis');
                    });
                }
            });

            if (settings.removeInline) {
                body.querySelectorAll(settings.removeInlineSelector).forEach(el => {
                    el.removeAttribute('style');
                });
            }

            if (settings.footer) {
                body.innerHTML += settings.footer;
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

            Promise.all(assetPromises).then(() => {
                iframe.contentWindow.focus();
                iframe.contentWindow.print();
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

        document.body.appendChild(iframe);
    }
    window.printThis = printThis;
}(window));
