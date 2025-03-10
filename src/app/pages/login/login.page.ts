import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Firestore, collection, query, where, getDocs } from '@angular/fire/firestore';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.css']
})
export class LoginPage {
  loginForm: FormGroup;
  errorMessage: string = ''; // Para manejar errores

  constructor(private fb: FormBuilder, private firestore: Firestore, private router: Router) {
    this.loginForm = this.fb.group({
      dni: ['', [Validators.required, Validators.minLength(7), Validators.maxLength(10)]]
    });
  }

  async onSubmit() {
    if (this.loginForm.valid) {
      const dni = this.loginForm.value.dni;

      try {
        // Referencia a la colección "usuarios"
        const usuariosRef = collection(this.firestore, 'usuarios');
        
        // Consulta para encontrar el usuario por DNI
        const q = query(usuariosRef, where('dni', '==', dni), where('active', '==', true));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          // Usuario encontrado y activo
          querySnapshot.forEach((doc) => {
            console.log('Usuario autenticado:', doc.data());
            this.router.navigate(['/home']); // Redirige al home o dashboard
          });
        } else {
          // Usuario no encontrado o inactivo
          this.errorMessage = 'DNI no encontrado o el usuario no está activo.';
        }
      } catch (error) {
        console.error('Error al autenticar:', error);
        this.errorMessage = 'Hubo un problema al autenticar. Inténtalo nuevamente.';
      }
    } else {
      this.errorMessage = 'Por favor, ingresa un DNI válido.';
    }
  }
}
