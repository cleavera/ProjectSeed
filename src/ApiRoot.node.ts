import {Child} from './domain/annotations/Child.node';
import {PersonModel} from './domain/models/PersonModel.node';
import {UserModel} from './domain/models/UserModel.node';

@Child(PersonModel, 'person')
@Child(UserModel, 'user')
export class ApiRoot {
    static port: number = 1337;

    description: string = 'An example api root';

    name: string = 'MyTestRoot';

    version: string = '0.0.1';
}
