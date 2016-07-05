import {IRoot} from './domain/interfaces/IRoot';
import {Child} from './domain/annotations/Child.node';
import {PersonModel} from './domain/models/PersonModel.node';

@Child(PersonModel, 'person')
export var apiRoot: IRoot = {
    description: 'An example api root',
    name: 'MyTestRoot',
    port: 1337,
    version: '0.0.1'
};
