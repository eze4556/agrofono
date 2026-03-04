import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';


@Component({
  selector: 'app-hero-section',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hero-section.component.html',
  styleUrl: './hero-section.component.scss'
})
export class HeroSectionComponent {


    constructor(private router: Router) {}
      // Navegar entre vistas
      navigateTo(route: string): void {
        this.router.navigate([`/${route}`]);
      }

      goToFreeRegister(): void {
        this.router.navigate(['/login'], { queryParams: { register: 1 } });
      }

      shareFurnitureLink(): void {
        const numeroWhatsApp = '5493546570859';
        const mensaje = `Hola, me gustaría obtener más información. ¿Podría ayudarme, por favor?`;
        const url = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensaje)}`;
        window.open(url, '_blank');
      }
}
