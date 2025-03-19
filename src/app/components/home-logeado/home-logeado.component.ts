import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-home-logeado',
  standalone: true,
  imports: [],
  templateUrl: './home-logeado.component.html',
  styleUrl: './home-logeado.component.scss'
})
export class HomeLogeadoComponent implements OnInit {
  userName: string = '';

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit(): void {
    if (!this.authService.isLoggedIn) {
      this.router.navigate(['/home']);
    } else {
      this.userName = this.authService.userName; // Obtener el nombre del usuario
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

  navigateTo(route: string): void {
    this.router.navigate([`/${route}`]);
  }
}

