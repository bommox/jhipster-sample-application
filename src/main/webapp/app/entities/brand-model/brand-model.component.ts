import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IBrandModel } from 'app/shared/model/brand-model.model';
import { Principal } from 'app/core';
import { BrandModelService } from './brand-model.service';

@Component({
    selector: 'jhi-brand-model',
    templateUrl: './brand-model.component.html'
})
export class BrandModelComponent implements OnInit, OnDestroy {
    brandModels: IBrandModel[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private brandModelService: BrandModelService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.brandModelService.query().subscribe(
            (res: HttpResponse<IBrandModel[]>) => {
                this.brandModels = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInBrandModels();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IBrandModel) {
        return item.id;
    }

    registerChangeInBrandModels() {
        this.eventSubscriber = this.eventManager.subscribe('brandModelListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
