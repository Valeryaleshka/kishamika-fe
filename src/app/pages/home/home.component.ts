import { Component, inject } from '@angular/core';
import { ContentWrapperComponent } from '../../components/content-wrapper/content-wrapper.component';
import { CenterDirective } from '../../derectives/center-content.directive';
import { NzButtonComponent } from 'ng-zorro-antd/button';
import { NgxImageCompressService } from 'ngx-image-compress';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-home',
  imports: [ContentWrapperComponent, CenterDirective, NzButtonComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  private imageCompress = inject(NgxImageCompressService);
  private messageService = inject(NzMessageService);

  protected preview: string | null = null;
  protected compressed: string | null = null;

  currentFile: File | null = null;
  availableForCompress = true;

  updateImageDisplay(event: Event): void {
    // Cast the event target to HTMLInputElement to access files property
    const input = event.target as HTMLInputElement;

    if (input.files && input.files.length > 0) {
      this.currentFile = input.files[0];

      this.preview = URL.createObjectURL(this.currentFile);
      console.log(this.preview);
    }
  }

  async compressFile() {
    if (this.currentFile && this.preview && this.availableForCompress) {
      this.availableForCompress = false;
      const currentOrientation = await this.imageCompress.getOrientation(this.currentFile);
      this.imageCompress
        .compressFile(this.preview, currentOrientation, 50, 50)
        .then((compressedImage) => {
          this.compressed = compressedImage;
          this.messageService.success('Successfully compressed');
        })
        .catch((error) => {
          console.error(error);
        })
        .finally(() => {
          this.availableForCompress = true;
        });
    }
  }

  download() {
    if (this.compressed) {
      const link = document.createElement('a');
      link.setAttribute('type', 'hidden');
      link.setAttribute('download', '');
      link.href = this.compressed;
      link.click();
    }
  }
}
