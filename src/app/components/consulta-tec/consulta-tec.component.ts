import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MercadoPagoService } from '../../services/mercadopago.service';
import { FirestoreService } from '../../services/firestore.service';

@Component({
  selector: 'app-consulta-tec',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './consulta-tec.component.html',
  styleUrl: './consulta-tec.component.scss'
})
export class ConsultaTecComponent implements OnInit {
  formData = {
    email: '',
    nombre: '',
    telefono: '',
    dni: ''
  };
  confirmCompatibility: boolean = false;
  price: string = 'Cargando...'; // Mostramos un mensaje temporal mientras obtenemos el precio
  isLoading: boolean = false; // Indicador de carga
  successMessage: string = ''; // Mensaje de éxito
  errorMessage: string = ''; // Mensaje de error
  showInfo: boolean = false;

  constructor(
    private mercadoPagoService: MercadoPagoService,
    private preciosService: FirestoreService // Asume que el servicio `getPrecios` está aquí
  ) {}

  ngOnInit() {
    this.loadPrice();
  }


  toggleInfo(): void {
    this.showInfo = !this.showInfo;
  }
  // Método para cargar el precio de las consultas
  async loadPrice() {
    try {
      const precios = await this.preciosService.getPrecios();
      if (precios && precios.consultas_tec !== undefined) {
        this.price = `ARS ${precios.consultas_tec.toFixed(2)}`; // Formato del precio
      } else {
        this.price = 'No disponible';
        console.error('No se encontró el precio de las consultas.');
      }
    } catch (error) {
      this.price = 'Error';
      console.error('Error al obtener el precio:', error);
    }
  }

  onSubmit() {

    if (!this.confirmCompatibility) {
      this.errorMessage = 'Debes confirmar que tu equipo es compatible antes de pagar.';
      return;
    }

    const paymentData = {
      email: this.formData.email,
      nombre: this.formData.nombre,
      telefono: this.formData.telefono,
      dni: this.formData.dni,
      price: parseFloat(this.price.replace('ARS ', '')),
    };

    this.isLoading = true;
    this.successMessage = '';
    this.errorMessage = '';

    this.mercadoPagoService.sendPaymentData(paymentData).subscribe({
      next: (response) => {
        console.log('Respuesta del servidor:', response);

        this.successMessage = '¡Consulta procesada exitosamente!';
        this.isLoading = false;

        if (response?.init_point) {
          window.location.href = response.init_point;
        } else {
          this.errorMessage = 'No se pudo obtener la URL de redirección.';
        }
      },
      error: (error) => {
        console.error('Error al procesar la consulta:', error);
        this.errorMessage = 'Hubo un error al procesar tu consulta. Inténtalo de nuevo.';
        this.isLoading = false;
      }
    });
  }

  shareFurnitureLink(): void {
    const numeroWhatsApp = "5493546570859";
    const mensaje = `Hola, soy un técnico suscripto. ¿Podría ayudarme, por favor?`;
    const url = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensaje)}`;
    window.open(url, "_blank");
}
}

