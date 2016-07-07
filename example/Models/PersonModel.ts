import {Decimal} from '../../src/annotations/Decimal';
import {DefaultModel} from '../../src/classes/DefaultModel';
import {Description} from '../../src/annotations/Description';
import {GENDER} from '../../src/constants/Gender';
import {Guid} from '../../src/annotations/Guid';
import {Integer} from '../../src/annotations/Integer';
import {Map} from '../../src/annotations/Map';
import {MaxLength} from '../../src/annotations/MaxLength';
import {NumberRange} from '../../src/annotations/NumberRange';
import {Options} from '../../src/annotations/Options';
import {PrimaryKey} from '../../src/annotations/PrimaryKey';
import {Required} from '../../src/annotations/Required';
import {String} from '../../src/annotations/String';

@Description('People')
@Map('Person', {
    age: 'age',
    name: 'fullName'
})
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
