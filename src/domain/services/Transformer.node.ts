import {IData} from '../interfaces/IData';

export class Transformer {
    static to(data: IData): any {
        return {
            attributes: data.data,
            id: data.id,
            type: data.resourceName
        };
    }

    static from(json: any): IData {
        return {
            data: json.attributes,
            id: json.id,
            resourceName: json.type
        };
    }
}
