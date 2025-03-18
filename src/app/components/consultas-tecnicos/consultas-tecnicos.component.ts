import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-consultas-tecnicos',
  standalone: true,
  imports: [],
  templateUrl: './consultas-tecnicos.component.html',
  styleUrl: './consultas-tecnicos.component.scss'
})
export class ConsultasTecnicosComponent {
    constructor(private router: Router) {}
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
