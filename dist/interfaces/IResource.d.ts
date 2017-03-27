export interface IResource {
    read(): any;
    save(json: any): void;
    remove(): void;
}
