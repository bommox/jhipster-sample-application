import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IBrandModel } from 'app/shared/model/brand-model.model';
import { BrandModelService } from './brand-model.service';

@Component({
    selector: 'jhi-brand-model-delete-dialog',
    templateUrl: './brand-model-delete-dialog.component.html'
})
export class BrandModelDeleteDialogComponent {
    brandModel: IBrandModel;

    constructor(private brandModelService: BrandModelService, public activeModal: NgbActiveModal, private eventManager: JhiEventManager) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.brandModelService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'brandModelListModification',
                content: 'Deleted an brandModel'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-brand-model-delete-popup',
    template: ''
})
export class BrandModelDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ brandModel }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(BrandModelDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
                this.ngbModalRef.componentInstance.brandModel = brandModel;
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
