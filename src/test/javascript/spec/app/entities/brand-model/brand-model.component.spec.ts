/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { JhipsterSampleApplicationTestModule } from '../../../test.module';
import { BrandModelComponent } from 'app/entities/brand-model/brand-model.component';
import { BrandModelService } from 'app/entities/brand-model/brand-model.service';
import { BrandModel } from 'app/shared/model/brand-model.model';

describe('Component Tests', () => {
    describe('BrandModel Management Component', () => {
        let comp: BrandModelComponent;
        let fixture: ComponentFixture<BrandModelComponent>;
        let service: BrandModelService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterSampleApplicationTestModule],
                declarations: [BrandModelComponent],
                providers: []
            })
                .overrideTemplate(BrandModelComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(BrandModelComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(BrandModelService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new BrandModel(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.brandModels[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
