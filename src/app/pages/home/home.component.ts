import { Component, inject, OnInit } from '@angular/core';
import { SearchBarComponent } from '../../components/search-bar/search-bar.component';
import { HttpClient } from '@angular/common/http';
import { BorderedCardComponent } from '../../components/bordered-card/bordered-card.component';
import { TitleHandleDirective } from '../../derectives/title-handle.directive';
import { ɵEmptyOutletComponent } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [SearchBarComponent, BorderedCardComponent, TitleHandleDirective, ɵEmptyOutletComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  http = inject(HttpClient);
  status: 'initial' | 'uploading' | 'success' | 'fail' = 'initial';
  file: File | null = null;
  filePath: string | ArrayBuffer | null = null;

  ngOnInit(): void {}

  // On file Select
  onChange(event: any) {
    const file: File = event.target.files[0];
    const reader = new FileReader();

    if (file) {
      this.status = 'initial';
      this.file = file;
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.filePath = reader.result;
      };
    }
  }

  onUpload() {
    // we will implement this method later
  }
}
