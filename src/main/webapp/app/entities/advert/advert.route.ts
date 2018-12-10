import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Advert } from 'app/shared/model/advert.model';
import { AdvertService } from './advert.service';
import { AdvertComponent } from './advert.component';
import { AdvertDetailComponent } from './advert-detail.component';
import { AdvertUpdateComponent } from './advert-update.component';
import { AdvertDeletePopupComponent } from './advert-delete-dialog.component';
import { IAdvert } from 'app/shared/model/advert.model';

@Injectable({ providedIn: 'root' })
export class AdvertResolve implements Resolve<IAdvert> {
    constructor(private service: AdvertService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Advert> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<Advert>) => response.ok),
                map((advert: HttpResponse<Advert>) => advert.body)
            );
        }
        return of(new Advert());
    }
}

export const advertRoute: Routes = [
    {
        path: 'advert',
        component: AdvertComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Adverts'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'advert/:id/view',
        component: AdvertDetailComponent,
        resolve: {
            advert: AdvertResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Adverts'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'advert/new',
        component: AdvertUpdateComponent,
        resolve: {
            advert: AdvertResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Adverts'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'advert/:id/edit',
        component: AdvertUpdateComponent,
        resolve: {
            advert: AdvertResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Adverts'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const advertPopupRoute: Routes = [
    {
        path: 'advert/:id/delete',
        component: AdvertDeletePopupComponent,
        resolve: {
            advert: AdvertResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Adverts'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
