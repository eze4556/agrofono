import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FirestoreService } from '../../services/firestore.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mi-suscripcion',
  standalone: true,
  templateUrl: './mi-suscripcion.component.html',
  styleUrl: './mi-suscripcion.component.scss',
  imports: [CommonModule, FormsModule]
})
export class MiSuscripcionComponent implements OnInit {
  subscription: any = null;

  constructor(private firestoreService: FirestoreService, private authService: AuthService, private router: Router,) {}

  async ngOnInit() {

    // Verificar si el usuario está logeado
    if (!this.authService.isLoggedIn) {
      this.router.navigate(['/home']); // Redirigir si no está autenticado
    }

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

    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
      const userData = JSON.parse(currentUser);
      if (userData.subscriptionId) {
        const subscriptionData = await this.firestoreService.getSubscripcionPorId(userData.subscriptionId);

        // Validar si la suscripción es válida antes de mostrarla
        if (subscriptionData && subscriptionData.status === 'approved') {
          this.subscription = subscriptionData;
        }
      }
    }
  }
}
