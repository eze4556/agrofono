import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MercadoPagoService } from '../../services/mercadopago.service';
import { FirestoreService } from '../../services/firestore.service';

@Component({
  selector: 'app-suscripcion',
  standalone: true,
  templateUrl: './suscripcion.component.html',
  styleUrls: ['./suscripcion.component.scss'],
  imports: [CommonModule, FormsModule],
})
export class SuscripcionComponent implements OnInit {
  formData = {
    email: '',
    dni: '',
    nombre: '',
    telefono: '',
  };

  price: string = 'Cargando...'; // Valor inicial antes de cargar el precio real
  isLoading: boolean = false; // Indica si el formulario está enviando datos
  successMessage: string = ''; // Mensaje de éxito
  errorMessage: string = ''; // Mensaje de error

  constructor(
    private mercadoPagoService: MercadoPagoService,
    private preciosService: FirestoreService // Servicio que provee los precios
  ) {}

  ngOnInit(): void {
    this.loadPrice();
  }

  // Método para cargar el precio de las suscripciones
  async loadPrice(): Promise<void> {
    try {
      const precios = await this.preciosService.getPrecios();
      if (precios && precios.suscripciones) {
        this.price = `ARS ${precios.suscripciones.toFixed(2)}`; // Formato de moneda
      } else {
        console.error('No se encontró el precio de las suscripciones.');
      }
    } catch (error) {
      console.error('Error al cargar el precio de las suscripciones:', error);
    }
  }

  onSubmit() {
    // Preparar los datos para enviarlos al backend
    const paymentData = {
      email: this.formData.email,
      dni: this.formData.dni,
      nombre: this.formData.nombre,
      telefono: this.formData.telefono,
      price: this.price,
    };

    this.isLoading = true;
    this.successMessage = '';
    this.errorMessage = '';

    // Llamar al servicio para enviar los datos al backend
    this.mercadoPagoService.sendSubPaymentData(paymentData).subscribe({
      next: (response) => {
        console.log('Respuesta del servidor:', response);
        this.successMessage = '¡Subscripción realizada con éxito!';
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error al enviar la subscripción:', error);
        this.errorMessage = 'Hubo un error al procesar tu subscripción. Inténtalo de nuevo.';
        this.isLoading = false;
      },
    });
  }
}
