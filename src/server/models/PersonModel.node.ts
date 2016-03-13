import {Model} from '../classes/Model.node';
import {Map} from '../annotations/Map.node';
import {PrimaryKey} from '../annotations/PrimaryKey.node';
import {Required} from '../annotations/Required.node';

@PrimaryKey('id')
@Map('Person', {
    age: 'age',
    id: 'id',
    name: 'fullName'
})
export class PersonModel extends Model {
    id: string;

    @Required
    name: string;

    age: number;

    constructor(data: any, id: string) {
        super();

        this.id = id;
        this.name = data.name;
        this.age = data.age;
    }
}
