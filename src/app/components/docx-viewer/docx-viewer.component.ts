import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, ElementRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { renderAsync } from 'docx-preview'; // Importa correctamente el método `renderAsync`

@Component({
  selector: 'app-docx-viewer',
  templateUrl: './docx-viewer.component.html',
  styleUrls: ['./docx-viewer.component.scss'],
  imports: [CommonModule, FormsModule],
  standalone: true,
})
export class DocxViewerComponent implements OnChanges {
  @Input() docxSrc: string | null = null;

  constructor(private elementRef: ElementRef) {}

  ngOnChanges() {
    if (this.docxSrc) {
      fetch(this.docxSrc)
        .then((response) => response.blob())
        .then((blob) => {
          const container = this.elementRef.nativeElement.querySelector('#docx-container');
          renderAsync(blob, container).catch((error: any) => {
            console.error('Error al renderizar el archivo DOCX:', error);
          });
        })
        .catch((error: any) => console.error('Error al cargar el archivo DOCX:', error));
    }
  }
}
