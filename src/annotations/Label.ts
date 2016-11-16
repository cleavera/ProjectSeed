import {IModel} from '../packages/Interfaces';
import {DecorateField} from '../packages/Helpers';

export function Label(target: IModel, key: string): void {
    'use strict';

    DecorateField.addDescriptor(target, key, 'label', true);
}
