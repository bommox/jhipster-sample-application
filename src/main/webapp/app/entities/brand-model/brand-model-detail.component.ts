import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IBrandModel } from 'app/shared/model/brand-model.model';

@Component({
    selector: 'jhi-brand-model-detail',
    templateUrl: './brand-model-detail.component.html'
})
export class BrandModelDetailComponent implements OnInit {
    brandModel: IBrandModel;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ brandModel }) => {
            this.brandModel = brandModel;
        });
    }

    previousState() {
        window.history.back();
    }
}
