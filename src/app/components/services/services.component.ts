import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [],
  templateUrl: './services.component.html',
  styleUrl: './services.component.scss'
})
export class ServicesComponent implements OnInit {

  constructor(private router: Router) {}
  ngOnInit(): void {
                // Detectar apertura de DevTools
                setInterval(() => {
                  if (window.outerWidth - window.innerWidth > 160 || window.outerHeight - window.innerHeight > 160) {
                    alert('No intentes inspeccionar la página.');
                    window.location.href = 'https://tusitio.com/bloqueado';
                  }
                }, 1000);
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
