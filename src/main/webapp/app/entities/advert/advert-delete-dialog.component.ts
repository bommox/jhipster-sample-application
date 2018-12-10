import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IAdvert } from 'app/shared/model/advert.model';
import { AdvertService } from './advert.service';

@Component({
    selector: 'jhi-advert-delete-dialog',
    templateUrl: './advert-delete-dialog.component.html'
})
export class AdvertDeleteDialogComponent {
    advert: IAdvert;

    constructor(private advertService: AdvertService, public activeModal: NgbActiveModal, private eventManager: JhiEventManager) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.advertService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'advertListModification',
                content: 'Deleted an advert'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-advert-delete-popup',
    template: ''
})
export class AdvertDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ advert }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(AdvertDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
                this.ngbModalRef.componentInstance.advert = advert;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate([{ outlets: { popup: null } }], { replaceUrl: true, queryParamsHandling: 'merge' });
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate([{ outlets: { popup: null } }], { replaceUrl: true, queryParamsHandling: 'merge' });
                        this.ngbModalRef = null;
                    }
                );
            }, 0);
        });
    }

    ngOnDestroy() {
        this.ngbModalRef = null;
    }
}
