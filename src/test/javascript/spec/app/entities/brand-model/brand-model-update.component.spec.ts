/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { JhipsterSampleApplicationTestModule } from '../../../test.module';
import { BrandModelUpdateComponent } from 'app/entities/brand-model/brand-model-update.component';
import { BrandModelService } from 'app/entities/brand-model/brand-model.service';
import { BrandModel } from 'app/shared/model/brand-model.model';

describe('Component Tests', () => {
    describe('BrandModel Management Update Component', () => {
        let comp: BrandModelUpdateComponent;
        let fixture: ComponentFixture<BrandModelUpdateComponent>;
        let service: BrandModelService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterSampleApplicationTestModule],
                declarations: [BrandModelUpdateComponent]
            })
                .overrideTemplate(BrandModelUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(BrandModelUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(BrandModelService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new BrandModel(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.brandModel = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.update).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );

            it(
                'Should call create service on save for new entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new BrandModel();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.brandModel = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.create).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );
        });
    });
});
