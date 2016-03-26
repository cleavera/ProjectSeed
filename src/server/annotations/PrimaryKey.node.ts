import {IModel} from '../interfaces/IModel';
import {Model} from '../classes/Model.node';
import {DecorateField} from '../services/DecorateField.node';

export function PrimaryKey(target: IModel, key: string): void {
    'use strict';
  
    DecorateField.setPrimaryKey(target, key);
}
