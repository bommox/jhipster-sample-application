import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IAdvert } from 'app/shared/model/advert.model';
import { Principal } from 'app/core';
import { AdvertService } from './advert.service';

@Component({
    selector: 'jhi-advert',
    templateUrl: './advert.component.html'
})
export class AdvertComponent implements OnInit, OnDestroy {
    adverts: IAdvert[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private advertService: AdvertService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.advertService.query().subscribe(
            (res: HttpResponse<IAdvert[]>) => {
                this.adverts = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInAdverts();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IAdvert) {
        return item.id;
    }

    registerChangeInAdverts() {
        this.eventSubscriber = this.eventManager.subscribe('advertListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
