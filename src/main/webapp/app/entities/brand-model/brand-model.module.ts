import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JhipsterSampleApplicationSharedModule } from 'app/shared';
import {
    BrandModelComponent,
    BrandModelDetailComponent,
    BrandModelUpdateComponent,
    BrandModelDeletePopupComponent,
    BrandModelDeleteDialogComponent,
    brandModelRoute,
    brandModelPopupRoute
} from './';

const ENTITY_STATES = [...brandModelRoute, ...brandModelPopupRoute];

@NgModule({
    imports: [JhipsterSampleApplicationSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        BrandModelComponent,
        BrandModelDetailComponent,
        BrandModelUpdateComponent,
        BrandModelDeleteDialogComponent,
        BrandModelDeletePopupComponent
    ],
    entryComponents: [BrandModelComponent, BrandModelUpdateComponent, BrandModelDeleteDialogComponent, BrandModelDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JhipsterSampleApplicationBrandModelModule {}
