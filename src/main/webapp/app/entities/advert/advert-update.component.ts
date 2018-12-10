import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IAdvert } from 'app/shared/model/advert.model';
import { AdvertService } from './advert.service';
import { IBrandModel } from 'app/shared/model/brand-model.model';
import { BrandModelService } from 'app/entities/brand-model';
import { IOwner } from 'app/shared/model/owner.model';
import { OwnerService } from 'app/entities/owner';

@Component({
    selector: 'jhi-advert-update',
    templateUrl: './advert-update.component.html'
})
export class AdvertUpdateComponent implements OnInit {
    advert: IAdvert;
    isSaving: boolean;

    models: IBrandModel[];

    owners: IOwner[];

    constructor(
        private jhiAlertService: JhiAlertService,
        private advertService: AdvertService,
        private brandModelService: BrandModelService,
        private ownerService: OwnerService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ advert }) => {
            this.advert = advert;
        });
        this.brandModelService.query({ filter: 'advert-is-null' }).subscribe(
            (res: HttpResponse<IBrandModel[]>) => {
                if (!this.advert.model || !this.advert.model.id) {
                    this.models = res.body;
                } else {
                    this.brandModelService.find(this.advert.model.id).subscribe(
                        (subRes: HttpResponse<IBrandModel>) => {
                            this.models = [subRes.body].concat(res.body);
                        },
                        (subRes: HttpErrorResponse) => this.onError(subRes.message)
                    );
                }
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.ownerService.query().subscribe(
            (res: HttpResponse<IOwner[]>) => {
                this.owners = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.advert.id !== undefined) {
            this.subscribeToSaveResponse(this.advertService.update(this.advert));
        } else {
            this.subscribeToSaveResponse(this.advertService.create(this.advert));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IAdvert>>) {
        result.subscribe((res: HttpResponse<IAdvert>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackOwnerById(index: number, item: IOwner) {
        return item.id;
    }
}
