import { Component, OnInit } from '@angular/core';
import { FirestoreService } from '../../services/firestore.service';
import { Computadoras } from '../../models/computadora.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

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

  constructor(private firestoreService: FirestoreService,
    private router: Router,
  private authService: AuthService) {}

  async ngOnInit() {
    if (!this.authService.isLoggedIn) {
      this.router.navigate(['/home']);
    }

    this.computadoras = await this.firestoreService.getComputadoras();
    // Inicialmente no mostramos ninguna computadora
    this.filteredComputadoras = [];

             // Detectar apertura de DevTools
             setInterval(() => {
              if (window.outerWidth - window.innerWidth > 160 || window.outerHeight - window.innerHeight > 160) {
                alert('No intentes inspeccionar la página.');
                window.location.href = 'https://tusitio.com/bloqueado';
              }
            }, 1000);

                // Detectar uso de debugger
                setInterval(() => {
                  const antes = new Date().getTime();
                  debugger;
                  const despues = new Date().getTime();
                  if (despues - antes > 200) {
                    alert('Inspección detectada. Redirigiendo...');
                    window.location.href = 'https://tusitio.com/bloqueado';
                  }
                }, 500);


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
