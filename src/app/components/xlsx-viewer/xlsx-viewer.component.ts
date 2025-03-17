import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-xlsx-viewer',
  templateUrl: './xlsx-viewer.component.html',
  styleUrls: ['./xlsx-viewer.component.scss'],
  imports:[CommonModule,FormsModule],
  standalone: true,
})
export class XlsxViewerComponent implements OnChanges {
  @Input() xlsxSrc: string | null = null;
  tableData: any[] = [];

  ngOnChanges() {
    if (this.xlsxSrc) {
      fetch(this.xlsxSrc)
        .then((response) => response.arrayBuffer())
        .then((data) => {
          const workbook = XLSX.read(data, { type: 'array' });
          const sheetName = workbook.SheetNames[0];
          const sheet = workbook.Sheets[sheetName];
          this.tableData = XLSX.utils.sheet_to_json(sheet, { header: 1 });
        })
        .catch((error) => console.error('Error al cargar el archivo XLSX:', error));
    }
  }
}
