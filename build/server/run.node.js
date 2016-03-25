"use strict";
/// <reference path="../../typings/main.d.ts" />
var Server_node_1 = require('./classes/Server.node');
/* tslint:disable:no-unused-expression */
new Server_node_1.Server(1337);
/* tslint:disable */
(function () {
    'use strict';
    console.log('Type quit to terminate');
    process.stdin.resume();
    process.stdin.setEncoding('utf8');
    process.stdin.on('data', function (text) {
        if (text === 'quit\r\n' || text === 'quit\n' || text === 'q\r\n' || text === 'q\n') {
            done();
        }
    });
    function done() {
        console.log('Shutting down');
        process.exit();
    }
})();
