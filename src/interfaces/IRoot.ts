import {DefaultModel} from '../models/DefaultModel';

export interface IRoot {
    port: number;

    _children: DefaultModel[];
}
