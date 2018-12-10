import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IAdvert } from 'app/shared/model/advert.model';

type EntityResponseType = HttpResponse<IAdvert>;
type EntityArrayResponseType = HttpResponse<IAdvert[]>;

@Injectable({ providedIn: 'root' })
export class AdvertService {
    public resourceUrl = SERVER_API_URL + 'api/adverts';

    constructor(private http: HttpClient) {}

    create(advert: IAdvert): Observable<EntityResponseType> {
        return this.http.post<IAdvert>(this.resourceUrl, advert, { observe: 'response' });
    }

    update(advert: IAdvert): Observable<EntityResponseType> {
        return this.http.put<IAdvert>(this.resourceUrl, advert, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IAdvert>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IAdvert[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
