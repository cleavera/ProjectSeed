import { IRoutingContext } from '../packages/Interfaces';
export declare class Association {
    static removeAssociation(context: IRoutingContext, Root: any, parentContext?: IRoutingContext): void;
    static addAssociation(context: IRoutingContext, parentContext: IRoutingContext, Root: any): void;
    static filter(context: IRoutingContext, parentContext: IRoutingContext, data: any, Root: any): any;
    private static _getAssociations(Root);
}
