import { Component, OnInit } from '@angular/core';
import { FirestoreService } from '../../services/firestore.service';
import { Computadoras } from '../../models/computadora.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ComputadoraDetalleComponent } from '../computadora-detalle/computadora-detalle.component';
import { Router } from '@angular/router';


@Component({
  selector: 'app-computadoras',
  standalone: true,
  templateUrl: './computadoras.component.html',
  styleUrls: ['./computadoras.component.scss'],
  imports:[CommonModule,FormsModule, ComputadoraDetalleComponent]
})
export class ComputadorasComponent implements OnInit {
  computadoras: Computadoras[] = [];
  selectedComputadora: Computadoras | null = null;

  constructor(private firestoreService: FirestoreService,
    private router: Router
  ) {}

  async ngOnInit() {
    this.computadoras = await this.firestoreService.getComputadoras();
  }

  selectComputadora(computadora: Computadoras) {
    // Redirige a la nueva ruta con el ID de la computadora seleccionada
    this.router.navigate(['/computadoras', computadora.id]);
  }

  closeDetalle() {
    this.selectedComputadora = null;
  }
}
