import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MercadoPagoService {
  private apiUrl = 'https://agroback-yp7t.onrender.com';

  constructor(private http: HttpClient,
   ) {}

  // Método para enviar la orden de pago al servidor backend
  sendPaymentData(paymentData: any): Observable<any> {
    const url = `${this.apiUrl}/create_preference`;
    return this.http.post(url, paymentData);
  }

    // Método para enviar la orden de pago al servidor backend
  sendSubPaymentData(paymentData: any): Observable<any> {
    const url = `${this.apiUrl}/create_subscription`;
    return this.http.post(url, paymentData);
  }

}


