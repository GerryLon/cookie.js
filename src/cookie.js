;(function(root, factory) {

    // commonJS 规范
    if (typeof module === 'object' && module && module.exports) {
        module.exports = factory();
    }

    // AMD规范
    else if (typeof define === 'function' && define.amd) {
        define([], factory);
    }

    // 浏览器实现
    else {
        root.cookie = factory();
    }

}(window, function() {
    
    /**
     * 读/写Cookie
     * JS中设置Cookie和HTTP方式相比较，少了对HttpOnly的控制，是因为JS不能读写HttpOnly Cookie；
     */
    function cookie(name, value, options) {

        var cookie = document.cookie;

        // set
        if (typeof value !== 'undefined') {
            options = options || {};
            if (value === null) {
                value = '';
                options.expires = -1;
            }
            var expires = '';
            if (options.expires && (typeof options.expires == 'number' || options.expires.toUTCString)) {
                var date;

                // 以天计算
                if (typeof options.expires == 'number') {
                    date = new Date();
                    date.setTime(date.getTime() + (options.expires * 24 * 60 * 60 * 1000));
                } else {
                    date = options.expires;
                }
                expires = '; expires=' + date.toUTCString();
            }
            var path = options.path ? '; path=' + options.path : '';
            var domain = options.domain ? '; domain=' + options.domain : '';
            var secure = options.secure ? '; secure' : '';
            document.cookie = [name, '=', encodeURIComponent(value), expires, path, domain, secure].join('');
        } else {
            var cookieRe = new RegExp('(?:^| )' + name + '=([^;]*)(?:;|$)'),
                cookieValue = cookieRe.exec(cookie);

            return cookieValue !== null ? cookieValue[1] : null;
        }
    }

    return cookie;
}));