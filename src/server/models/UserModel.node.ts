import {Map} from '../annotations/Map.node';
import {Model} from '../classes/Model.node';
import {UserResource} from '../resources/UserResource.node';
import {PrimaryKey} from '../annotations/PrimaryKey.node';
import {Required} from '../annotations/Required.node';
import {String} from '../annotations/String.node';
import {Guid} from '../annotations/Guid.node';

@Map('User', {
    email: 'email',
    id: 'id',
    password: 'password',
    username: 'username'
})
export class UserModel extends Model {
    static resource: typeof UserResource = UserResource;

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
