import { IBrand } from 'app/shared/model//brand.model';

export interface IBrandModel {
    id?: number;
    code?: string;
    name?: string;
    year?: number;
    brand?: IBrand;
}

export class BrandModel implements IBrandModel {
    constructor(public id?: number, public code?: string, public name?: string, public year?: number, public brand?: IBrand) {}
}
