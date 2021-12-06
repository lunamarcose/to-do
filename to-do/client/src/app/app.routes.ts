import { RouterModule, Routes } from '@angular/router';
import { FolderComponent } from './components/folder/folder.component';
import { TodoComponent } from './components/todo/todo.component';

const APP_ROUTES: Routes = [
  { path: 'folders', component: FolderComponent },
  { path: 'folder/:id', component: TodoComponent },
  { path: '**', pathMatch: 'full', redirectTo: 'folders' },
];

export const APP_ROUTING = RouterModule.forRoot(APP_ROUTES);
