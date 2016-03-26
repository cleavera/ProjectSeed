export interface IRest {
    get(id?: string): any;

    post(item: any): any;

    put(id: string, item: any): any;

    delete(id: string): void;
    
    options?(): void;
}
