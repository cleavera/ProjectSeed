import {Child} from '../../src/annotations/Child';
import {DefaultModel} from '../../src/classes/DefaultModel';
import {DefaultResource} from '../../src/classes/DefaultResource';
import {Guid} from '../../src/annotations/Guid';
import {Map} from '../../src/annotations/Map';
import {PersonModel} from './PersonModel';
import {PrimaryKey} from '../../src/annotations/PrimaryKey';
import {Required} from '../../src/annotations/Required';
import {String} from '../../src/annotations/String';
import {UserResource} from '../Resources/UserResource';

@Child(PersonModel, 'person')
@Map('User', {
    email: 'email',
    password: 'password',
    username: 'username'
})
export class UserModel extends DefaultModel {
    static resource: typeof DefaultResource = UserResource;

    @PrimaryKey
    @Guid
    id: string;

    @Required
    @String
    username: string;

    @Required
    @String
    password: string;

    @Required
    @String
    email: string;

    constructor(data: any, id: string) {
        super();

        this.id = id;
        this.username = data.username;
        this.password = data.password;
        this.email = data.email;
    }
}
