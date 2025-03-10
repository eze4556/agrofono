import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MercadoPagoService } from '../../services/mercadopago.service';


@Component({
  selector: 'app-consultas',
  standalone: true,
  templateUrl: './consultas.component.html',
  styleUrls: ['./consultas.component.scss'],
  imports: [CommonModule, FormsModule]
})
export class ConsultasComponent {
  formData = {
    email: '',
    nombre: '',
    telefono: '',
    dni: ''
  };

  price: string = 'ARS 10.00';
  isLoading: boolean = false; // Indicador de carga
  successMessage: string = ''; // Mensaje de éxito
  errorMessage: string = ''; // Mensaje de error

  constructor(private mercadoPagoService: MercadoPagoService) {}

  onSubmit() {
    const paymentData = {
      email: this.formData.email,
      nombre: this.formData.nombre,
      telefono: this.formData.telefono,
      dni: this.formData.dni,
      price: this.price
    };

    this.isLoading = true;
    this.successMessage = '';
    this.errorMessage = '';

    // Llamar al método del servicio
    this.mercadoPagoService.sendPaymentData(paymentData).subscribe({
      next: (response) => {
        console.log('Respuesta del servidor:', response);
        this.successMessage = '¡Consulta procesada exitosamente!';
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error al procesar la consulta:', error);
        this.errorMessage = 'Hubo un error al procesar tu consulta. Inténtalo de nuevo.';
        this.isLoading = false;
      }
    });
  }
}
