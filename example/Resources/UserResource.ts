import {DefaultResource} from '../../dist/packages/Classes';
import {IEventManager} from '../../dist/packages/Interfaces';

export class UserResource extends DefaultResource {
    private static _stripPasswordField(item: any): void {
        if (item.hasOwnProperty('password')) {
            delete item.password;
        }
    }

    constructor(_: any, Root: any, eventManager: IEventManager) {
        super('User', Root, eventManager);
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
