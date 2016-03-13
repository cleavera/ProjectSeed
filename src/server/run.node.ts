/// <reference path="../../typings/main.d.ts" />
import {Server} from './classes/Server.node';

/* tslint:disable:no-unused-expression */
new Server(1337);
/* tslint:disable */

(() => {
    'use strict';

    console.log('Type quit to terminate');

    process.stdin.resume();
    process.stdin.setEncoding('utf8');

    process.stdin.on('data', (text) => {
        if (text === 'quit\r\n' || text === 'quit\n') {
            done();
        }
    });

    function done(): void {
        console.log('Shutting down');
        process.exit();
    }
})();
