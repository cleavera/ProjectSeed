import * as uuid from 'node-uuid';

export class Guid {
    static generate(): string {
        return uuid.v4();
    }
}
