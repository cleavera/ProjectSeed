import {PrimaryKey} from '../annotations/PrimaryKey.node';
import {Map} from '../annotations/Map.node';
import {Model} from '../classes/Model.node';
import {UserResource} from '../resources/UserResource.node';

@PrimaryKey('id')
@Map('User', {
    email: 'email',
    id: 'id',
    password: 'password',
    username: 'username'
})
export class UserModel extends Model {
    static resource: typeof UserResource = UserResource;

    id: string;

    username: string;

    password: string;

    email: string;

    constructor(data: any, id: string) {
        super();

        this.id = id;
        this.username = data.username;
        this.password = data.password;
        this.email = data.email;
    }
}
