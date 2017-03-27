"use strict";
const fs = require('fs');
class Log {
    static info(...messages) {
        messages.forEach(message => {
            let output = new Date().toISOString() + ' \u001b[36m[INFO]\u001b[39m ' + JSON.stringify(message);
            Log._log(output);
        });
    }
    static debug(...messages) {
        messages.forEach(message => {
            let output = new Date().toISOString() + ' \u001b[37m[DEBUG]\u001b[39m ' + JSON.stringify(message);
            Log._log(output);
        });
    }
    static warn(error, ...messages) {
        messages.forEach(message => {
            let output = new Date().toISOString() + ' \u001b[33m[WARN]\u001b[39m ' + JSON.stringify(message);
            Log._log(output);
        });
        Log._log(error.stack);
    }
    static error(error, ...messages) {
        messages.forEach(message => {
            let output = new Date().toISOString() + ' \u001b[31m[ERROR]\u001b[39m ' + JSON.stringify(message);
            Log._log(output);
        });
        Log._log(error.stack);
    }
    static _log(message) {
        console.log(message);
        fs.appendFileSync(Log._logLocation, message + '\n');
    }
}
Log._logLocation = './log.txt';
exports.Log = Log;
