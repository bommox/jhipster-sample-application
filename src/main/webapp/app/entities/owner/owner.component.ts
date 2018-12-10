import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IOwner } from 'app/shared/model/owner.model';
import { Principal } from 'app/core';
import { OwnerService } from './owner.service';

@Component({
    selector: 'jhi-owner',
    templateUrl: './owner.component.html'
})
export class OwnerComponent implements OnInit, OnDestroy {
    owners: IOwner[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private ownerService: OwnerService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.ownerService.query().subscribe(
            (res: HttpResponse<IOwner[]>) => {
                this.owners = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInOwners();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IOwner) {
        return item.id;
    }

    registerChangeInOwners() {
        this.eventSubscriber = this.eventManager.subscribe('ownerListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
