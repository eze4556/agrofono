import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FirestoreService } from '../../services/firestore.service';


@Component({
  selector: 'app-suscripciones-tecnicas',
   standalone: true,
  imports: [CommonModule],
  templateUrl: './suscripciones-tecnicas.component.html',
  styleUrl: './suscripciones-tecnicas.component.scss'
})
export class SuscripcionesTecnicasComponent {
  price: string = 'ARS 0.00'; // Precio inicial antes de cargar el dato real

  constructor(private router: Router, private preciosService: FirestoreService) {}

faqOpen: { [key: number]: boolean } = {};

ngOnInit(): void {
  this.loadPrice();

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
  // Navegar entre vistas
  navigateTo(route: string): void {
    this.router.navigate([`/${route}`]);
  }

  // Método para cargar el precio de la suscripción
  async loadPrice(): Promise<void> {
    try {
      const precios = await this.preciosService.getPrecios();
      if (precios && precios.suscripciones) {
        this.price = `ARS ${precios.suscripciones.toFixed(2)}`; // Formatear el precio
      } else {
        console.error('No se encontró el precio de la suscripción.');
      }
    } catch (error) {
      console.error('Error al cargar el precio de la suscripción:', error);
    }
  }

toggleFAQ(index: number) {
  this.faqOpen[index] = !this.faqOpen[index];
}

shareFurnitureLink(): void {
  const numeroWhatsApp = "5493546570859";
  const mensaje = `Hola, me gustaría obtener más información acerca de las Suscripciones. ¿Podría ayudarme, por favor?`;
  const url = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensaje)}`;
  window.open(url, "_blank");
}
}
