import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { APP_ROUTING } from './app.routes';

import { AppComponent } from './app.component';
import { TodoComponent } from './components/todo/todo.component';
import { FolderComponent } from './components/folder/folder.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';

@NgModule({
  declarations: [AppComponent, TodoComponent, FolderComponent, NavbarComponent],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    HttpClientModule,
    APP_ROUTING,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
