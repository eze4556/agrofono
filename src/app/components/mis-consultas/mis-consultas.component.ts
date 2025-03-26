import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FirestoreService } from '../../services/firestore.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mis-consultas',
  standalone: true,
  templateUrl: './mis-consultas.component.html',
  styleUrl: './mis-consultas.component.scss',
  imports: [CommonModule]
})
export class MisConsultasComponent implements OnInit {
  consultas: any[] = [];

  constructor(private router: Router,
    private firestoreService: FirestoreService,
     private authService: AuthService) {}

  async ngOnInit() {
      // Verificar si el usuario está logeado
    if (!this.authService.isLoggedIn) {
      this.router.navigate(['/home']); // Redirigir si no está autenticado
    }

    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
      const userData = JSON.parse(currentUser);
      if (userData.dni) {
        this.consultas = await this.firestoreService.getConsultasPorDni(userData.dni);

        // Convertir paymentDate correctamente
        this.consultas = this.consultas.map(consulta => ({
          ...consulta,
          paymentDate: consulta.paymentDate
            ? new Date(consulta.paymentDate.seconds ? consulta.paymentDate.seconds * 1000 : consulta.paymentDate)
            : null
        }));
      }
    }
  }


}
