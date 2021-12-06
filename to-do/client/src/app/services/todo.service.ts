import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Todo } from '../models/Todo';

//const API = environment
const API = environment.api_url;

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  constructor(private http: HttpClient) {}

  getAll(idFolder: number): Observable<any> {
    return this.http.get(API + '/todos/' + idFolder);
  }

  create(todo: Todo): Observable<any> {
    return this.http.post(
      API + '/todos',
      { title: todo.title, completed: todo.completed, folderId: todo.folderId },
      httpOptions
    );
  }

  delete(todo: Todo): Observable<any> {
    return this.http.delete(API + '/todos/' + todo.id);
  }

  update(todo: Todo): Observable<any> {
    return this.http.put(
      API + '/todos/' + todo.id,
      { title: todo.title },
      httpOptions
    );
  }

  changeStatus(todo: Todo): Observable<any> {
    return this.http.put(
      API + '/todos/updateStatus/' + todo.id,
      null,
      httpOptions
    );
  }
}
