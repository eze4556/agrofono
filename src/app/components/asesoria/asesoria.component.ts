import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';


@Component({
  selector: 'app-asesoria',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './asesoria.component.html',
  styleUrl: './asesoria.component.scss'
})
export class AsesoriaComponent implements OnInit{

    constructor(private router: Router) {}
  ngOnInit(): void {

  }
      // Navegar entre vistas
      navigateTo(route: string): void {
        this.router.navigate([`/${route}`]);
      }

faqOpen: { [key: number]: boolean } = {};

  toggleFAQ(index: number) {
    this.faqOpen[index] = !this.faqOpen[index];
  }

  shareFurnitureLink(): void {
    const numeroWhatsApp = "5493546570859";
    const mensaje = `Hola, me gustaría obtener más información acerca de las Consultas. ¿Podría ayudarme, por favor?`;
    const url = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensaje)}`;
    window.open(url, "_blank");
}

}





