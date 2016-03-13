"use strict";
var Url = (function () {
    function Url(url) {
        var _this = this;
        this._pointer = -1;
        var urlParts = url.split('?'), pathParts = urlParts[0].split('/');
        this.url = url;
        this.path = urlParts[0];
        this.queryString = urlParts[1];
        this.parts = pathParts.slice(1, pathParts.length);
        this.params = {};
        if (urlParts[1]) {
            var params = urlParts[1].split('&');
            params.forEach(function (param) {
                var keyValue = param.split('=');
                _this.params[keyValue[0]] = keyValue[1];
            });
        }
    }
    Url.prototype.toString = function () {
        return this.url;
    };
    Object.defineProperty(Url.prototype, "current", {
        get: function () {
            return this.parts[this._pointer];
        },
        enumerable: true,
        configurable: true
    });
    Url.prototype.next = function () {
        if (this._pointer < this.parts.length) {
            this._pointer++;
        }
        if (this._pointer < this.parts.length) {
            return {
                done: false,
                value: this.current
            };
        }
        return {
            done: true
        };
    };
    return Url;
}());
exports.Url = Url;
