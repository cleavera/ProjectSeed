import {Child} from './domain/annotations/Child.node';
import {PersonModel} from './domain/models/PersonModel.node';

@Child(PersonModel, 'person')
export class ApiRoot {
    static port: number = 1337;

    description: string = 'An example api root';

    name: string = 'MyTestRoot';

    version: string = '0.0.1';
}
