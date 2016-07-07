/// <reference path="../typings/main.d.ts" />
import {Server} from '../src/classes/Server.node';
import {ApiRoot} from './ApiRoot';

/* tslint:disable:no-unused-expression */
new Server(ApiRoot);
/* tslint:enable */

(() => {
    'use strict';

    console.log('Type quit to terminate');

    process.stdin.resume();
    process.stdin.setEncoding('utf8');

    process.stdin.on('data', (text) => {
        if (text === 'quit\r\n' || text === 'quit\n' || text === 'q\r\n' || text === 'q\n') {
            done();
        }
    });

    function done(): void {
        console.log('Shutting down');
        process.exit();
    }
})();
