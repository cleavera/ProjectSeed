import {IModel, IValidator} from '../packages/Interfaces';
import {DefaultModel} from '../packages/Classes';
import {DecorateField} from '../packages/Helpers';

export function ForeignKey(target: IModel, key: string): void {
    'use strict';

    const typeName: string = 'foreignKey';

    DecorateField.addType(target, key, typeName);
}
