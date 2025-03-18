import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [],
  templateUrl: './services.component.html',
  styleUrl: './services.component.scss'
})
export class ServicesComponent {

  constructor(private router: Router) {}
    // Navegar entre vistas
    navigateTo(route: string): void {
      this.router.navigate([`/${route}`]);
    }


    shareFurnitureLink(): void {
      const numeroWhatsApp = "5493546570859";
      const mensaje = `Hola, me gustaría obtener más información. ¿Podría ayudarme, por favor?`;
      const url = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensaje)}`;
      window.open(url, "_blank");
  }
}
