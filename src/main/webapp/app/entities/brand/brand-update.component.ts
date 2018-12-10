import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IBrand } from 'app/shared/model/brand.model';
import { BrandService } from './brand.service';
import { IBrandModel } from 'app/shared/model/brand-model.model';
import { BrandModelService } from 'app/entities/brand-model';

@Component({
    selector: 'jhi-brand-update',
    templateUrl: './brand-update.component.html'
})
export class BrandUpdateComponent implements OnInit {
    brand: IBrand;
    isSaving: boolean;

    brandmodels: IBrandModel[];

    constructor(
        private jhiAlertService: JhiAlertService,
        private brandService: BrandService,
        private brandModelService: BrandModelService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ brand }) => {
            this.brand = brand;
        });
        this.brandModelService.query({ filter: 'brand-is-null' }).subscribe(
            (res: HttpResponse<IBrandModel[]>) => {
                if (!this.brand.brandModel || !this.brand.brandModel.id) {
                    this.brandmodels = res.body;
                } else {
                    this.brandModelService.find(this.brand.brandModel.id).subscribe(
                        (subRes: HttpResponse<IBrandModel>) => {
                            this.brandmodels = [subRes.body].concat(res.body);
                        },
                        (subRes: HttpErrorResponse) => this.onError(subRes.message)
                    );
                }
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.brand.id !== undefined) {
            this.subscribeToSaveResponse(this.brandService.update(this.brand));
        } else {
            this.subscribeToSaveResponse(this.brandService.create(this.brand));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IBrand>>) {
        result.subscribe((res: HttpResponse<IBrand>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    trackBrandModelById(index: number, item: IBrandModel) {
        return item.id;
    }
}
