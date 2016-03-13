import {PersonModel} from './PersonModel.node';
import {UserModel} from './UserModel.node';

export class ModelBundle {
    person: typeof PersonModel = PersonModel;
    user: typeof UserModel = UserModel;
}
