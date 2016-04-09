import {IModel} from '../interfaces/IModel';
import {DecorateField} from '../services/DecorateField.node';

export function PrimaryKey(target: IModel, key: string): void {
    'use strict';

    DecorateField.setPrimaryKey(target, key);
}
