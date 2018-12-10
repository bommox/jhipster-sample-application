/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { JhipsterSampleApplicationTestModule } from '../../../test.module';
import { BrandModelDetailComponent } from 'app/entities/brand-model/brand-model-detail.component';
import { BrandModel } from 'app/shared/model/brand-model.model';

describe('Component Tests', () => {
    describe('BrandModel Management Detail Component', () => {
        let comp: BrandModelDetailComponent;
        let fixture: ComponentFixture<BrandModelDetailComponent>;
        const route = ({ data: of({ brandModel: new BrandModel(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterSampleApplicationTestModule],
                declarations: [BrandModelDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(BrandModelDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(BrandModelDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.brandModel).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
