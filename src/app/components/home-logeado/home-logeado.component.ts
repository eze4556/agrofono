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
export class HomeLogeadoComponent implements OnInit  {

  constructor(private router: Router,  private authService: AuthService) {}

  ngOnInit(): void {
    // Verificar si el usuario está logeado
    if (!this.authService.isLoggedIn) {
      this.router.navigate(['/home']); // Redirigir si no está autenticado
    }
  }
    // Navegar entre vistas
    navigateTo(route: string): void {
      this.router.navigate([`/${route}`]);
    }

}
