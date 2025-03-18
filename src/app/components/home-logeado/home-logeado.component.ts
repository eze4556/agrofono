import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-logeado',
  standalone: true,
  imports: [],
  templateUrl: './home-logeado.component.html',
  styleUrl: './home-logeado.component.scss'
})
export class HomeLogeadoComponent {

  constructor(private router: Router) {}
    // Navegar entre vistas
    navigateTo(route: string): void {
      this.router.navigate([`/${route}`]);
    }

}
