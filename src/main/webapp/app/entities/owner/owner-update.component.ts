import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IOwner } from 'app/shared/model/owner.model';
import { OwnerService } from './owner.service';

@Component({
    selector: 'jhi-owner-update',
    templateUrl: './owner-update.component.html'
})
export class OwnerUpdateComponent implements OnInit {
    owner: IOwner;
    isSaving: boolean;

    constructor(private ownerService: OwnerService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ owner }) => {
            this.owner = owner;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.owner.id !== undefined) {
            this.subscribeToSaveResponse(this.ownerService.update(this.owner));
        } else {
            this.subscribeToSaveResponse(this.ownerService.create(this.owner));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IOwner>>) {
        result.subscribe((res: HttpResponse<IOwner>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }
}
