import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IAdvert } from 'app/shared/model/advert.model';

@Component({
    selector: 'jhi-advert-detail',
    templateUrl: './advert-detail.component.html'
})
export class AdvertDetailComponent implements OnInit {
    advert: IAdvert;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ advert }) => {
            this.advert = advert;
        });
    }

    previousState() {
        window.history.back();
    }
}
