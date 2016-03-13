"use strict";
var fs = require('fs');
var Log = (function () {
    function Log() {
    }
    Log.info = function () {
        var messages = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            messages[_i - 0] = arguments[_i];
        }
        messages.forEach(function (message) {
            var output = new Date().toISOString() + ' \u001b[36m[INFO]\u001b[39m ' + JSON.stringify(message);
            Log._log(output);
        });
    };
    Log.debug = function () {
        var messages = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            messages[_i - 0] = arguments[_i];
        }
        messages.forEach(function (message) {
            var output = new Date().toISOString() + ' \u001b[37m[DEBUG]\u001b[39m ' + JSON.stringify(message);
            Log._log(output);
        });
    };
    Log.warn = function (error) {
        var messages = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            messages[_i - 1] = arguments[_i];
        }
        messages.forEach(function (message) {
            var output = new Date().toISOString() + ' \u001b[33m[WARN]\u001b[39m ' + JSON.stringify(message);
            Log._log(output);
        });
        Log._log(error.stack);
    };
    Log.error = function (error) {
        var messages = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            messages[_i - 1] = arguments[_i];
        }
        messages.forEach(function (message) {
            var output = new Date().toISOString() + ' \u001b[31m[ERROR]\u001b[39m ' + JSON.stringify(message);
            Log._log(output);
        });
        Log._log(error.stack);
    };
    Log._log = function (message) {
        console.log(message);
        fs.appendFileSync(Log._logLocation, message + '\n');
    };
    Log._logLocation = './log.txt';
    return Log;
}());
exports.Log = Log;
