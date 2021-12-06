import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Folder } from '../../models/Folder';
import { FolderService } from '../../services/folder.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.component.html',
  styleUrls: ['./folder.component.css'],
})
export class FolderComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private folderService: FolderService,
    private router: Router
  ) {}
  folders: Folder[] = [];
  newFolder: string;

  ngOnInit(): void {
    this.getFolders();
  }
  listTodos(id: number) {
    this.router.navigate(['/folder', id]);
  }
  saveFolder() {
    if (this.newFolder) {
      let folder = new Folder();
      folder.id = new Date().valueOf();
      folder.title = this.newFolder;
      this.folderService.create(folder).subscribe(
        (data) => {
          this.getFolders();
        },
        (err) => console.log(err)
      );
      this.newFolder = '';
    }
  }
  delete(id: number) {
    const idxFolder = this.folders.findIndex((folder) => folder.id === id);
    const folderDelete = this.folders[idxFolder];
    this.folderService.delete(folderDelete).subscribe(
      (data) => {
        this.getFolders();
      },
      (err) => console.log(err)
    );
  }
  getFolders() {
    this.folders = [];
    this.folderService.getAll().subscribe(
      (data) => {
        for (let i = 0; i < data.length; i++) {
          const id = data[i].id;
          const title = data[i].title;
          const folder = new Folder();
          folder.id = id;
          folder.title = title;
          this.folders.push(folder);
        }
      },
      (err) => console.log(err)
    );
  }
}
