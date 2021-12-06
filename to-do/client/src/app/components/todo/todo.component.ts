import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Todo } from '../../models/Todo';
import { TodoService } from '../../services/todo.service';
import { ActivatedRoute } from '@angular/router';
import { Folder } from 'src/app/models/Folder';
import { FolderService } from 'src/app/services/folder.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css'],
})
export class TodoComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private modalService: NgbModal,
    private todoService: TodoService,
    private folderService: FolderService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    this.activatedRoute.params.subscribe((params) => {
      this.folderService.get(params['id']).subscribe(
        (data) => {
          if (data == null) {
            this.router.navigate(['/folders']);
          }
          let folder = new Folder();
          folder.id = data.id;
          folder.title = data.title;
          this.folder = folder;
          this.getTodos();
        },
        (err) => console.log(err)
      );
    });
  }
  todos: Todo[] = [];
  newTodo: string;
  folder: Folder;
  editProfileForm: FormGroup;
  selectedToDo: Todo;
  ngOnInit() {
    this.editProfileForm = this.fb.group({
      name: [''],
    });
  }
  saveTodo() {
    if (this.newTodo) {
      let todo = new Todo();
      todo.id = new Date().valueOf();
      todo.title = this.newTodo;
      todo.completed = false;
      todo.folderId = this.folder.id;
      this.todoService.create(todo).subscribe(
        (data) => {
          this.getTodos();
        },
        (err) => console.log(err)
      );
      this.newTodo = '';
    }
  }
  delete(id: number) {
    const idxTodo = this.todos.findIndex((todo) => todo.id === id);
    const todoDelete = this.todos[idxTodo];
    this.todoService.delete(todoDelete).subscribe(
      (data) => {
        this.getTodos();
      },
      (err) => console.log(err)
    );
  }
  completed(id: number) {
    this.todos[id].completed = !this.todos[id].completed;
  }
  getTodos() {
    this.todos = [];
    this.todoService.getAll(this.folder.id).subscribe(
      (data) => {
        for (let i = 0; i < data.length; i++) {
          const id = data[i].id;
          const title = data[i].title;
          const completed = data[i].completed;
          const folderId = data[i].folderId;
          const todo = new Todo();
          todo.id = id;
          todo.title = title;
          todo.completed = completed;
          todo.folderId = folderId;
          this.todos.push(todo);
        }
      },
      (err) => {
        console.log(err);
        this.router.navigate(['/folders']);
      }
    );
  }
  updateStatus(id: number) {
    const idxTodo = this.todos.findIndex((todo) => todo.id === id);
    const todoUpdate = this.todos[idxTodo];
    this.todoService.changeStatus(todoUpdate).subscribe(
      (data) => {},
      (err) => console.log(err)
    );
  }
  openModal(targetModal: any, todo: Todo) {
    this.selectedToDo = todo;
    this.modalService.open(targetModal, {
      centered: true,
      backdrop: 'static',
    });
    this.editProfileForm.patchValue({
      name: todo.title,
    });
  }
  onSubmit() {
    this.modalService.dismissAll();
    const objIndex = this.todos.findIndex(
      (todo) => todo.id == this.selectedToDo.id
    );
    const todoUpdate = this.todos[objIndex];
    todoUpdate.title = this.editProfileForm.getRawValue().name;
    this.todoService.update(todoUpdate).subscribe(
      (data) => {},
      (err) => console.log(err)
    );
  }
}
