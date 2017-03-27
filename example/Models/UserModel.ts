import {DefaultModel, DefaultResource} from '../../dist/packages/Classes';
import {Child, Guid, Label, Map, PrimaryKey, Required, String} from '../../dist/packages/Annotations';
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
    @Label
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
