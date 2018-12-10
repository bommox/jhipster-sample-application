/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { JhipsterSampleApplicationTestModule } from '../../../test.module';
import { AdvertDetailComponent } from 'app/entities/advert/advert-detail.component';
import { Advert } from 'app/shared/model/advert.model';

describe('Component Tests', () => {
    describe('Advert Management Detail Component', () => {
        let comp: AdvertDetailComponent;
        let fixture: ComponentFixture<AdvertDetailComponent>;
        const route = ({ data: of({ advert: new Advert(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterSampleApplicationTestModule],
                declarations: [AdvertDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(AdvertDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(AdvertDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.advert).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
