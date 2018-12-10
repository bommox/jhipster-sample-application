import { IBrandModel } from 'app/shared/model//brand-model.model';
import { IOwner } from 'app/shared/model//owner.model';

export const enum AdvertStatus {
    DRAW = 'DRAW',
    PUBLISHED = 'PUBLISHED',
    PENDING = 'PENDING',
    SOLD = 'SOLD'
}

export interface IAdvert {
    id?: number;
    description?: string;
    status?: AdvertStatus;
    model?: IBrandModel;
    owner?: IOwner;
}

export class Advert implements IAdvert {
    constructor(
        public id?: number,
        public description?: string,
        public status?: AdvertStatus,
        public model?: IBrandModel,
        public owner?: IOwner
    ) {}
}
