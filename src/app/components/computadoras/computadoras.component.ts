import { Component, OnInit } from '@angular/core';
import { FirestoreService } from '../../services/firestore.service';
import { Computadoras } from '../../models/computadora.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-computadoras',
  standalone: true,
  templateUrl: './computadoras.component.html',
  styleUrls: ['./computadoras.component.scss'],
  imports: [CommonModule, FormsModule],
})
export class ComputadorasComponent implements OnInit {
  computadoras: Computadoras[] = [];
  filteredComputadoras: Computadoras[] = []; // Computadoras después del filtro
  selectedComputadora: Computadoras | null = null;

  constructor(private firestoreService: FirestoreService, private router: Router) {}

  async ngOnInit() {
    this.computadoras = await this.firestoreService.getComputadoras();
    // Inicialmente no mostramos ninguna computadora
    this.filteredComputadoras = [];
  }

  // Filtrar computadoras por tipo
  filterComputadoras(tipo: string): void {
    this.filteredComputadoras = this.computadoras.filter(
      (computadora) => computadora.tipo_pc === tipo
    );
  }

  // Seleccionar una computadora
  selectComputadora(computadora: Computadoras): void {
    this.router.navigate(['/computadoras', computadora.id]);
  }

  // Cerrar el detalle
  closeDetalle(): void {
    this.selectedComputadora = null;
  }
}
