export interface IResponse {
    status(code: number): void;

    text(message: string): void;

    serve(filePath: string): void;

    json(json: any): void;

    addHeader(name: string, value: string): void;
}
