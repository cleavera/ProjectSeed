import {Child} from '../../src/annotations/Child.node';
import {DefaultModel} from '../../src/models/DefaultModel.node';
import {DefaultResource} from '../../src/resources/DefaultResource.node';
import {Guid} from '../../src/annotations/Guid.node';
import {Map} from '../../src/annotations/Map.node';
import {PersonModel} from './PersonModel';
import {PrimaryKey} from '../../src/annotations/PrimaryKey.node';
import {Required} from '../../src/annotations/Required.node';
import {String} from '../../src/annotations/String.node';
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
