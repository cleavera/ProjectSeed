import {IModel} from '../interfaces/IModel';
import {DecorateField} from '../services/DecorateField';

export function PrimaryKey(target: IModel, key: string): void {
    'use strict';

    DecorateField.setPrimaryKey(target, key);
}
