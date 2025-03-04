import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';


@Component({
  selector: 'app-suscripciones-tecnicas',
   standalone: true,
  imports: [CommonModule],
  templateUrl: './suscripciones-tecnicas.component.html',
  styleUrl: './suscripciones-tecnicas.component.scss'
})
export class SuscripcionesTecnicasComponent {

  constructor(private router: Router) {}
  // Navegar entre vistas
  navigateTo(route: string): void {
    this.router.navigate([`/${route}`]);
  }
faqOpen: { [key: number]: boolean } = {};

toggleFAQ(index: number) {
  this.faqOpen[index] = !this.faqOpen[index];
}
}
