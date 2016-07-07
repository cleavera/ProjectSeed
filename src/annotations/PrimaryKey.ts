import {IModel} from '../packages/Interfaces';
import {DecorateField} from '../packages/Helpers';

export function PrimaryKey(target: IModel, key: string): void {
    'use strict';

    DecorateField.setPrimaryKey(target, key);
}
