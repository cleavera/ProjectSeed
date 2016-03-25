import {ISerialisable} from './ISerialisable';

export interface IServerError extends Error, ISerialisable {
    statusCode: number;
}
