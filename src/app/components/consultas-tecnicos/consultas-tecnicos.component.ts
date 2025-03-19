import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-consultas-tecnicos',
  standalone: true,
  imports: [],
  templateUrl: './consultas-tecnicos.component.html',
  styleUrl: './consultas-tecnicos.component.scss'
})
export class ConsultasTecnicosComponent {
    constructor(private router: Router,
       private authService: AuthService
    ) {}

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

    }
      // Navegar entre vistas
      navigateTo(route: string): void {
        this.router.navigate([`/${route}`]);
      }

  shareFurnitureLink(): void {
    const numeroWhatsApp = "5493546570859";
    const mensaje = `Hola, soy un técnico suscripto. ¿Podría ayudarme, por favor?`;
    const url = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensaje)}`;
    window.open(url, "_blank");
}
}
