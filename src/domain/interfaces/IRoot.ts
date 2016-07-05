import {DefaultModel} from '../models/DefaultModel.node';

export interface IRoot {
    port: number;

    _children: DefaultModel[];
}
