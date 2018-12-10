import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JhipsterSampleApplicationSharedModule } from 'app/shared';
import {
    AdvertComponent,
    AdvertDetailComponent,
    AdvertUpdateComponent,
    AdvertDeletePopupComponent,
    AdvertDeleteDialogComponent,
    advertRoute,
    advertPopupRoute
} from './';

const ENTITY_STATES = [...advertRoute, ...advertPopupRoute];

@NgModule({
    imports: [JhipsterSampleApplicationSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [AdvertComponent, AdvertDetailComponent, AdvertUpdateComponent, AdvertDeleteDialogComponent, AdvertDeletePopupComponent],
    entryComponents: [AdvertComponent, AdvertUpdateComponent, AdvertDeleteDialogComponent, AdvertDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JhipsterSampleApplicationAdvertModule {}
