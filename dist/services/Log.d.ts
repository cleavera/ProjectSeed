export declare class Log {
    private static _logLocation;
    static info(...messages: Array<any>): void;
    static debug(...messages: Array<any>): void;
    static warn(error: Error, ...messages: Array<any>): void;
    static error(error: Error, ...messages: Array<any>): void;
    private static _log(message);
}
