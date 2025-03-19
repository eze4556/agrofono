import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit(): void {
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
  }
    // Navegar entre vistas
    navigateTo(route: string): void {
      this.router.navigate([`/${route}`]);
    }

  handleAction(action: string) {
    console.log(`Acción seleccionada: ${action}`);
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

}
