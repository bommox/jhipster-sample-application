import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { BrandModel } from 'app/shared/model/brand-model.model';
import { BrandModelService } from './brand-model.service';
import { BrandModelComponent } from './brand-model.component';
import { BrandModelDetailComponent } from './brand-model-detail.component';
import { BrandModelUpdateComponent } from './brand-model-update.component';
import { BrandModelDeletePopupComponent } from './brand-model-delete-dialog.component';
import { IBrandModel } from 'app/shared/model/brand-model.model';

@Injectable({ providedIn: 'root' })
export class BrandModelResolve implements Resolve<IBrandModel> {
    constructor(private service: BrandModelService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<BrandModel> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<BrandModel>) => response.ok),
                map((brandModel: HttpResponse<BrandModel>) => brandModel.body)
            );
        }
        return of(new BrandModel());
    }
}

export const brandModelRoute: Routes = [
    {
        path: 'brand-model',
        component: BrandModelComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'BrandModels'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'brand-model/:id/view',
        component: BrandModelDetailComponent,
        resolve: {
            brandModel: BrandModelResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'BrandModels'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'brand-model/new',
        component: BrandModelUpdateComponent,
        resolve: {
            brandModel: BrandModelResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'BrandModels'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'brand-model/:id/edit',
        component: BrandModelUpdateComponent,
        resolve: {
            brandModel: BrandModelResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'BrandModels'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const brandModelPopupRoute: Routes = [
    {
        path: 'brand-model/:id/delete',
        component: BrandModelDeletePopupComponent,
        resolve: {
            brandModel: BrandModelResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'BrandModels'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
