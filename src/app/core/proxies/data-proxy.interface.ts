import { Observable } from 'rxjs';
import { EntityMetadata } from '../models/serde';

export interface DataProxy<T extends EntityMetadata<T>> {
  baseUri: string;
  getAll(): Observable<T[]>;
  getById(id: number): Observable<T>;
  insert(data: T): Observable<T>;
  update(data: T): Observable<T>;
  delete(id: number): Observable<void>;
}
