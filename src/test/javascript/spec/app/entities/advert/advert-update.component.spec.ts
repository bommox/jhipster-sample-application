/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { JhipsterSampleApplicationTestModule } from '../../../test.module';
import { AdvertUpdateComponent } from 'app/entities/advert/advert-update.component';
import { AdvertService } from 'app/entities/advert/advert.service';
import { Advert } from 'app/shared/model/advert.model';

describe('Component Tests', () => {
    describe('Advert Management Update Component', () => {
        let comp: AdvertUpdateComponent;
        let fixture: ComponentFixture<AdvertUpdateComponent>;
        let service: AdvertService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterSampleApplicationTestModule],
                declarations: [AdvertUpdateComponent]
            })
                .overrideTemplate(AdvertUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(AdvertUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AdvertService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new Advert(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.advert = entity;
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
                    const entity = new Advert();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.advert = entity;
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
