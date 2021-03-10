import { HttpClient } from '@angular/common/http';

import { Observable, EMPTY } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import { EntityMetadata } from '../models/serde';
import { DataProxy } from './data-proxy.interface';

export abstract class HttpDataProxy<T extends EntityMetadata<T>> implements DataProxy<T> {
  abstract baseUri: string;

  constructor(public parentKlass: new () => T, private http: HttpClient) { }

  getAll(): Observable<T[]> {
    return this.http
      .get(`${this.baseUri}`)
      .pipe(
        map((res: any[]) =>
          res.map((r) => new this.parentKlass().deserialize(r))
        )
      );
  }

  getById(id: number): Observable<T> {
    return this.http
      .get(`${this.baseUri}/${id}`)
      .pipe(map((res: any) => new this.parentKlass().deserialize(res)));
  }

  insert(data: T): Observable<T> {
    return this.http
      .post(this.baseUri, data instanceof EntityMetadata ? data.serialize() : data)
      .pipe(map((res: any) => new this.parentKlass().deserialize(res)));
  }

  update(data: T): Observable<T> {
    return this.http
      .put(`${this.baseUri}/${data.id}`, data instanceof EntityMetadata ? data.serialize() : data)
      .pipe(map((res: any) => new this.parentKlass().deserialize(res)));
  }

  delete(id: number): Observable<void> {
    return this.http
      .delete(`${this.baseUri}/${id}`)
      .pipe(switchMap((_) => EMPTY));
  }
}
