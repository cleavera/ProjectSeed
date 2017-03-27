"use strict";
class Url {
    constructor(url) {
        this._pointer = -1;
        let urlParts = url.split('?'), pathParts = urlParts[0].substring(1).split('/');
        if (urlParts[0].substring(1) === '') {
            pathParts = [];
        }
        this.url = url;
        this.path = urlParts[0];
        this.queryString = urlParts[1];
        this.parts = pathParts;
        this.params = {};
        if (urlParts[1]) {
            let params = urlParts[1].split('&');
            params.forEach(param => {
                let keyValue = param.split('=');
                this.params[keyValue[0]] = keyValue[1];
            });
        }
    }
    toString() {
        return this.url;
    }
    get current() {
        return this.parts[this._pointer];
    }
    next() {
        if (this._pointer < this.parts.length) {
            this._pointer++;
        }
        if (this._pointer < this.parts.length) {
            return {
                done: this._pointer >= this.parts.length,
                value: this.current
            };
        }
        return {
            done: true
        };
    }
}
exports.Url = Url;
