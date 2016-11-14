import {DefaultModel} from '../../src/packages/Classes';
import {Decimal, Description, Guid, Integer, Map, MaxLength, NumberRange, Options, OrderBy, PrimaryKey, Required, String} from '../../src/packages/Annotations';
import {GENDER} from '../Constants/Gender';

@Description('People')
@Map('Person', {
    age: 'age',
    name: 'fullName'
})
@OrderBy('age')
export class PersonModel extends DefaultModel {
    @Guid
    @PrimaryKey
    id: string;

    @String
    @Required
    @MaxLength(20)
    @Description('The name of the person')
    name: string;

    @Integer
    @NumberRange(0, 99)
    @Description('The age of the person')
    age: number;

    @Options(GENDER)
    @String
    @Description('The gender of the person')
    gender: string;

    @Decimal(2)
    @Description('The height of the person in meters')
    height: number;

    constructor(data: any, id: string) {
        super();

        this.id = id;
        this.name = data.name;
        this.age = data.age;
        this.gender = data.gender;
        this.height = data.height;
    }
}
