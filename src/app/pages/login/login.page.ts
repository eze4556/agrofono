import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Firestore, collection, query, where, getDocs } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

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

  constructor(private fb: FormBuilder, private firestore: Firestore, private router: Router, private authService: AuthService) {
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
          querySnapshot.forEach((doc) => {
            const userData = doc.data();
            console.log('Usuario autenticado:', userData);

            // Guardar los datos del usuario usando AuthService
            this.authService.login(userData);

            alert('Inicio de sesión exitoso. Bienvenido/a.');

            // Redirigir al usuario a "/home-tecnico"
            this.router.navigate(['/home-tecnico']);
          });
        } else {
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
