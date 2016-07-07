import {DefaultModel} from '../../src/classes/DefaultModel';
import {DefaultResource} from '../../src/classes/DefaultResource';
import {UserResource} from '../Resources/UserResource';
import {PersonModel} from './PersonModel';
import {Child, Guid, Map, PrimaryKey, Required, String} from '../../src/packages/Annotations';

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
