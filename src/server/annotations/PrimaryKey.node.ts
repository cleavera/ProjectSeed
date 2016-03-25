export function PrimaryKey(field: string): ClassDecorator {
    'use strict';

    return function(target: any): void {
        target.primaryKey = field;
    };
}
