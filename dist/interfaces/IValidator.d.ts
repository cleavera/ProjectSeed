export interface IValidator {
    (newValue: any, oldValue?: any): boolean;
}
