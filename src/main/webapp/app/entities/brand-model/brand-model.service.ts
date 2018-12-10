import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IBrandModel } from 'app/shared/model/brand-model.model';

type EntityResponseType = HttpResponse<IBrandModel>;
type EntityArrayResponseType = HttpResponse<IBrandModel[]>;

@Injectable({ providedIn: 'root' })
export class BrandModelService {
    public resourceUrl = SERVER_API_URL + 'api/brand-models';

    constructor(private http: HttpClient) {}

    create(brandModel: IBrandModel): Observable<EntityResponseType> {
        return this.http.post<IBrandModel>(this.resourceUrl, brandModel, { observe: 'response' });
    }

    update(brandModel: IBrandModel): Observable<EntityResponseType> {
        return this.http.put<IBrandModel>(this.resourceUrl, brandModel, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IBrandModel>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IBrandModel[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
