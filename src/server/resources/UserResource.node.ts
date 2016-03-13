import {Resource} from '../classes/Resource.node';

export class UserResource extends Resource {
    private static _stripPasswordField(item: any): void {
        if (item.hasOwnProperty('password')) {
            delete item.password;
        }
    }

    constructor() {
        super('User');
    }

    get(id?: string): any {
        let data: any = super.get(id);

        if (id) {
            UserResource._stripPasswordField(data);
        } else {
            for (let uid in data) {
                if (data.hasOwnProperty(uid)) {
                    UserResource._stripPasswordField(data[uid]);
                }
            }
        }

        return data;
    }
}
