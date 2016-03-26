import {Model} from '../classes/Model.node';
import {Map} from '../annotations/Map.node';
import {PrimaryKey} from '../annotations/PrimaryKey.node';
import {Required} from '../annotations/Required.node';
import {Description} from '../annotations/Description.node';
import {String} from '../annotations/String.node';
import {Integer} from '../annotations/Integer.node';
import {Guid} from '../annotations/Guid.node';
import {Options} from '../annotations/Options.node';
import {Gender} from '../constants/gender.node';

@Description('People')
@Map('Person', {
    age: 'age',
    id: 'id',
    name: 'fullName'
})
export class PersonModel extends Model {
    @Guid
    @PrimaryKey
    id: string;

    @Required
    @String
    name: string;

    @Integer
    age: number;

    @Options(Gender)
    @String
    gender: string;

    constructor(data: any, id: string) {
        super();

        this.id = id;
        this.name = data.name;
        this.age = data.age;
    }
}
