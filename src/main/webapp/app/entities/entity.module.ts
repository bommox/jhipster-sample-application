import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { JhipsterSampleApplicationAdvertModule } from './advert/advert.module';
import { JhipsterSampleApplicationBrandModule } from './brand/brand.module';
import { JhipsterSampleApplicationBrandModelModule } from './brand-model/brand-model.module';
import { JhipsterSampleApplicationOwnerModule } from './owner/owner.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    // prettier-ignore
    imports: [
        JhipsterSampleApplicationAdvertModule,
        JhipsterSampleApplicationBrandModule,
        JhipsterSampleApplicationBrandModelModule,
        JhipsterSampleApplicationOwnerModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JhipsterSampleApplicationEntityModule {}
