export declare class DecorateField {
    static addDescriptor(instance: any, field: string, descriptorName: string, value: any): void;
    static addType(instance: any, field: string, type: string): void;
    static setPrimaryKey(instance: any, field: string): void;
    static getterSetter(object: any, key: string, onGet?: (value: any) => any, onSet?: (newValue: any) => any): void;
}
