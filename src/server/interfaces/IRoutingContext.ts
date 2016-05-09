import {IModel} from './IModel';
import {IRest} from './IRest';

export interface IRoutingContext {
    Model: typeof IModel;

    id: string;

    resourceName: string;

    restService: IRest;
}
