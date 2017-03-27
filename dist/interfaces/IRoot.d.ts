import { DefaultModel } from '../classes/DefaultModel';
export interface IRoot {
    port: number;
    _children: DefaultModel[];
}
