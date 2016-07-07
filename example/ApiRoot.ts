import {Child} from '../src/annotations/Child.node';
import {PersonModel} from './Models/PersonModel';
import {UserModel} from './Models/UserModel';

@Child(PersonModel, 'person')
@Child(UserModel, 'user')
export class ApiRoot {
    static port: number = 1337;

    description: string = 'An example api root';

    name: string = 'MyTestRoot';

    version: string = '0.0.1';
}
