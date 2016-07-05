import {DefaultModel} from '../models/DefaultModel.node';

export interface IRoot {
    _children?: typeof DefaultModel[];

    version: string;

    name: string;

    description: string;

    port: number;
}
