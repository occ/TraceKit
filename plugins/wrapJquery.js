/**
 * Extended support for backtraces and global error handling for most
 * asynchronous jQuery functions.
 */
(function traceKitAsyncForjQuery(window) {

    // quit if jQuery or TraceKit isn't on the page
    var $ = window.$;
    var TraceKit = window.TraceKit;
    if (!$ || !TraceKit) {
        if (window.console && !TraceKit.suppressWarnings) {
            window.console.warn('Unable to load TraceKit jQuery plugin: TraceKit or jQuery is not available ' +
                'at the time of invocation.');
        }
        return;
    }
    // Bail out if window.onerror can do this work for us
    if (window.TraceKit.supportsExtendedWindowOnError()) {
        return;
    }

    var _oldEventAdd = $.event.add;
    $.event.add = function traceKitEventAdd(elem, types, handler, data, selector) {
        var _handler;

        if (handler.handler) {
            _handler = handler.handler;
            handler.handler = TraceKit.wrap(handler.handler);
        } else {
            _handler = handler;
            handler = TraceKit.wrap(handler);
        }

        // If the handler we are attaching doesn’t have the same guid as
        // the original, it will never be removed when someone tries to
        // unbind the original function later. Technically as a result of
        // this our guids are no longer globally unique, but whatever, that
        // never hurt anybody RIGHT?!
        if (_handler.guid) {
            handler.guid = _handler.guid;
        } else {
            handler.guid = _handler.guid = $.guid++;
        }

        return _oldEventAdd.call(this, elem, types, handler, data, selector);
    };

    var _oldReady = $.fn.ready;
    $.fn.ready = function traceKitjQueryReadyWrapper(fn) {
        return _oldReady.call(this, TraceKit.wrap(fn));
    };

    var _oldAjax = $.ajax;
    $.ajax = function traceKitAjaxWrapper(url, options) {
        var keys = ['complete', 'error', 'success'], key;

        // Taken from https://github.com/jquery/jquery/blob/eee2eaf1d7a189d99106423a4206c224ebd5b848/src/ajax.js#L311-L318
        // If url is an object, simulate pre-1.5 signature
        if (typeof url === 'object') {
            options = url;
            url = undefined;
        }

        // Force options to be an object
        options = options || {};

        while(key = keys.pop()) {
            if ($.isFunction(options[key])) {
                options[key] = TraceKit.wrap(options[key]);
            }
        }

        try {
            return _oldAjax.call(this, url, options);
        } catch (e) {
            TraceKit.report(e);
            throw e;
        }
    };


}(this));