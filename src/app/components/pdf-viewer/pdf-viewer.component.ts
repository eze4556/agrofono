import { Component, Input, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PdfViewerModule } from 'ng2-pdf-viewer';

@Component({
  selector: 'app-pdf-viewer',
  templateUrl: './pdf-viewer.component.html',
  styleUrls: ['./pdf-viewer.component.scss'],
  standalone: true,
  imports: [CommonModule, PdfViewerModule],
})
export class PdfViewerComponent implements OnChanges {
  @Input() pdfSrc: string | null = null;

  ngOnChanges() {
    console.log('PDF recibido por el componente:', this.pdfSrc);
  }

  onPdfError(event: any) {
    console.error('Error cargando el PDF:', event);
    alert('Hubo un problema al cargar el archivo PDF.');
  }

}
