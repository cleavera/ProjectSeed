import {IRoutingContext} from '../packages/Interfaces';
import {ServerError} from '../packages/Errors';
import {Json} from './Json';

interface IAssociation {
    parent: string;
    parentId: string;
    child: string;
    childId: string;
}

export class Association {
    static removeAssociation(context: IRoutingContext, Root: any, parentContext?: IRoutingContext): void {
        if (!context && !parentContext) {
            return;
        }

        let associations: IAssociation[] = this._getAssociations(Root);

        let currentAssociations: IAssociation[] = associations.filter(association => {
            let isCorrectParentContext: boolean = parentContext
                ? (
                    association.parent === parentContext.resourceName
                    && association.parentId === parentContext.id
                ) : true;

            let isCorrectChildContext: boolean = context
                ? (
                    association.child === context.resourceName
                    && association.childId === context.id
                ) : true;

            return isCorrectParentContext && isCorrectChildContext;
        });

        currentAssociations.forEach(association => {
            associations.splice(associations.indexOf(association));
        });

        new Json(Root.dataLocation + '/private/association.json').save(associations);
    }

    static addAssociation(context: IRoutingContext, parentContext: IRoutingContext, Root: any): void {
        let associations: IAssociation[] = this._getAssociations(Root);

        let currentAssociations: IAssociation[] = associations.filter(association => {
            let isCorrectParentContext: boolean = association.parent === parentContext.resourceName && association.parentId === parentContext.id;

            return isCorrectParentContext && association.child === context.resourceName && association.childId === context.id;
        });

        if (currentAssociations.length) {
            return;
        }

        associations.push({ child: context.resourceName, childId: context.id, parent: parentContext.resourceName, parentId: parentContext.id });

        new Json(Root.dataLocation + '/private/association.json').save(associations);
    }

    static filter(context: IRoutingContext, parentContext: IRoutingContext, data: any, Root: any): any {
        let associations: IAssociation[] = this._getAssociations(Root),
            ids: string[] = Object.keys(data),
            out: any = {};

        associations.forEach(association => {
            let isCorrectParentContext: boolean = association.parent === parentContext.resourceName && association.parentId === parentContext.id;

            if (isCorrectParentContext && association.child === context.resourceName && ids.indexOf(association.childId) > -1 ) {
                out[association.childId] = data[association.childId];
            }
        });

        return out;
    }

    private static _getAssociations(Root: any): IAssociation[] {
        try {
            return new Json(Root.dataLocation + '/private/association.json').read();
        } catch (e) {
            throw new ServerError();
        }
    }
}
