/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { JhipsterSampleApplicationTestModule } from '../../../test.module';
import { AdvertComponent } from 'app/entities/advert/advert.component';
import { AdvertService } from 'app/entities/advert/advert.service';
import { Advert } from 'app/shared/model/advert.model';

describe('Component Tests', () => {
    describe('Advert Management Component', () => {
        let comp: AdvertComponent;
        let fixture: ComponentFixture<AdvertComponent>;
        let service: AdvertService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterSampleApplicationTestModule],
                declarations: [AdvertComponent],
                providers: []
            })
                .overrideTemplate(AdvertComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(AdvertComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AdvertService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new Advert(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.adverts[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
