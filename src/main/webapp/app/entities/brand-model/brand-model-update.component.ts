import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IBrandModel } from 'app/shared/model/brand-model.model';
import { BrandModelService } from './brand-model.service';
import { IBrand } from 'app/shared/model/brand.model';
import { BrandService } from 'app/entities/brand';

@Component({
    selector: 'jhi-brand-model-update',
    templateUrl: './brand-model-update.component.html'
})
export class BrandModelUpdateComponent implements OnInit {
    brandModel: IBrandModel;
    isSaving: boolean;

    brands: IBrand[];

    constructor(
        private jhiAlertService: JhiAlertService,
        private brandModelService: BrandModelService,
        private brandService: BrandService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ brandModel }) => {
            this.brandModel = brandModel;
        });
        this.brandService.query().subscribe(
            (res: HttpResponse<IBrand[]>) => {
                this.brands = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.brandModel.id !== undefined) {
            this.subscribeToSaveResponse(this.brandModelService.update(this.brandModel));
        } else {
            this.subscribeToSaveResponse(this.brandModelService.create(this.brandModel));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IBrandModel>>) {
        result.subscribe((res: HttpResponse<IBrandModel>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackBrandById(index: number, item: IBrand) {
        return item.id;
    }
}
