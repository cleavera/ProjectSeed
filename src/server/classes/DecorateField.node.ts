export class DecorateField {
    static getterSetter(object: any, key: string, onGet?: (value: any) => any, onSet?: (newValue: any) => any): void {
        let descriptor: PropertyDescriptor = Object.getOwnPropertyDescriptor(object, key);

        if (!descriptor) {
            descriptor = {
                configurable: true
            };
        }

        if (!descriptor.get) {
            descriptor.get = function(): any {
                if (!this._backingFields) {
                    this._backingFields = {};
                }

                return this._backingFields[key];
            };

            descriptor.set = function(newValue: any): void {
                if (!this._backingFields) {
                    this._backingFields = {};
                }

                this._backingFields[key] = newValue;
            };
        }

        if (onGet) {
            let oldGet: () => any = descriptor.get;

            descriptor.get = function(): any {
                return onGet.call(this, oldGet.call(this));
            };
        }

        if (onSet) {
            let oldSet: (newValue: any) => void = descriptor.set;

            descriptor.set = function(newValue: any): void {
                oldSet.call(this, onSet.call(this, newValue));
            };
        }

        Object.defineProperty(object, key, descriptor);
    }
}
