import {DefaultModel, DefaultResource} from '../../src/packages/Classes';
import {Child, Guid, Map, PrimaryKey, Required, String} from '../../src/packages/Annotations';
import {UserResource} from '../Resources/UserResource';
import {PersonModel} from './PersonModel';

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
