import { IBrandModel } from 'app/shared/model//brand-model.model';

export interface IBrand {
    id?: number;
    code?: string;
    name?: string;
    logoUrl?: string;
    brandModel?: IBrandModel;
}

export class Brand implements IBrand {
    constructor(public id?: number, public code?: string, public name?: string, public logoUrl?: string, public brandModel?: IBrandModel) {}
}
