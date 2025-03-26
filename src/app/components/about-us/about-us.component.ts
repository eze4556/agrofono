import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-about-us',
  standalone: true,
  imports: [],
  templateUrl: './about-us.component.html',
  styleUrl: './about-us.component.scss'
})
export class AboutUsComponent implements OnInit{

  constructor(private router: Router) {}
  ngOnInit(): void {

  }
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
