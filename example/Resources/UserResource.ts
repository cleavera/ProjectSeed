import {DefaultResource} from '../../src/classes/DefaultResource';

export class UserResource extends DefaultResource {
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
