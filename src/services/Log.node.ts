import * as fs from 'fs';

export class Log {
    private static _logLocation: string = './log.txt';

    static info(...messages: Array<any>): void {
        messages.forEach(message => {
            let output: string = new Date().toISOString() + ' \u001b[36m[INFO]\u001b[39m ' + JSON.stringify(message);

            Log._log(output);
        });
    }

    static debug(...messages: Array<any>): void {
        messages.forEach(message => {
            let output: string = new Date().toISOString() + ' \u001b[37m[DEBUG]\u001b[39m ' + JSON.stringify(message);

            Log._log(output);
        });
    }

    static warn(error: Error, ...messages: Array<any>): void {
        messages.forEach(message => {
            let output: string = new Date().toISOString() + ' \u001b[33m[WARN]\u001b[39m ' + JSON.stringify(message);

            Log._log(output);
        });

        Log._log(error.stack);
    }

    static error(error: Error, ...messages: Array<any>): void {
        messages.forEach(message => {
            let output: string = new Date().toISOString() + ' \u001b[31m[ERROR]\u001b[39m ' + JSON.stringify(message);

            Log._log(output);
        });

        Log._log(error.stack);
    }

    private static _log(message: string): void {
        console.log(message);
        fs.appendFileSync(Log._logLocation, message + '\n' );
    }
}
