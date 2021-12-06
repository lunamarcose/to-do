import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Folder } from '../models/Folder';

//const API = environment
const API = environment.api_url;

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class FolderService {
  constructor(private http: HttpClient) {}

  get(id: number): Observable<any> {
    return this.http.get(API + '/folders/' + id);
  }

  getAll(): Observable<any> {
    return this.http.get(API + '/folders');
  }

  create(folder: Folder): Observable<any> {
    return this.http.post(
      API + '/folders',
      { title: folder.title },
      httpOptions
    );
  }

  delete(folder: Folder): Observable<any> {
    return this.http.delete(API + '/folders/' + folder.id);
  }
}
