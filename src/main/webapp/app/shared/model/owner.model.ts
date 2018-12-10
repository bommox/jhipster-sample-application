import { IAdvert } from 'app/shared/model//advert.model';

export interface IOwner {
    id?: number;
    name?: string;
    owners?: IAdvert[];
}

export class Owner implements IOwner {
    constructor(public id?: number, public name?: string, public owners?: IAdvert[]) {}
}
