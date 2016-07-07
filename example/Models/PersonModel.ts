import {Decimal} from '../../src/domain/annotations/Decimal.node';
import {DefaultModel} from '../../src/domain/models/DefaultModel.node';
import {Description} from '../../src/domain/annotations/Description.node';
import {GENDER} from '../../src/domain/constants/Gender.node';
import {Guid} from '../../src/domain/annotations/Guid.node';
import {Integer} from '../../src/domain/annotations/Integer.node';
import {Map} from '../../src/domain/annotations/Map.node';
import {MaxLength} from '../../src/domain/annotations/MaxLength.node';
import {NumberRange} from '../../src/domain/annotations/NumberRange.node';
import {Options} from '../../src/domain/annotations/Options.node';
import {PrimaryKey} from '../../src/domain/annotations/PrimaryKey.node';
import {Required} from '../../src/domain/annotations/Required.node';
import {String} from '../../src/domain/annotations/String.node';

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
