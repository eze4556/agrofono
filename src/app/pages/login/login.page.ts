import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Firestore, collection, query, where, getDocs } from '@angular/fire/firestore';
import { AuthService } from '../../services/auth.service';
import { FirestoreService } from '../../services/firestore.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.css']
})
export class LoginPage implements OnInit {
  loginForm: FormGroup;
  errorMessage: string = ''; // Para manejar errores

  registerForm: FormGroup;
  isRegisterModalOpen = false;
  isSubmittingRegister = false;
  registerSuccessMessage = '';

  constructor(
    private fb: FormBuilder,
    private firestore: Firestore,
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService,
    private firestoreService: FirestoreService
  ) {
    this.loginForm = this.fb.group({
      dni: ['', [Validators.required, Validators.minLength(7), Validators.maxLength(10)]]
    });

    this.registerForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(2)]],
      dni: ['', [Validators.required, Validators.pattern(/^[0-9]+$/), Validators.minLength(7), Validators.maxLength(10)]],
      telefono: ['', [Validators.required, Validators.pattern(/^[0-9]+$/), Validators.minLength(6)]],
      email: ['', [Validators.required, Validators.email]],
    });
  }
  ngOnInit(): void {
                // Detectar apertura de DevTools
                setInterval(() => {
                  if (window.outerWidth - window.innerWidth > 160 || window.outerHeight - window.innerHeight > 160) {
                    alert('No intentes inspeccionar la página.');
                    window.location.href = 'https://tusitio.com/bloqueado';
                  }
                }, 1000);

                this.route.queryParamMap.subscribe((params) => {
                  if (params.get('register') === '1') {
                    this.openRegisterModal();
                  }
                });
  }

  async onSubmit() {
    if (this.loginForm.valid) {
      const dni = this.loginForm.value.dni;

      try {
        // Referencia a la colección "usuarios"
        const usuariosRef = collection(this.firestore, 'usuarios');

        // Consulta para encontrar el usuario por DNI
        const q = query(usuariosRef, where('dni', '==', dni));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          querySnapshot.forEach((doc) => {
            const userData = doc.data();
            console.log('Usuario autenticado:', userData);

            if (!userData['active']) {
              this.errorMessage = 'Tu cuenta aún no fue aprobada.';
              return;
            }

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

  openRegisterModal() {
    this.registerSuccessMessage = '';
    this.isRegisterModalOpen = true;
  }

  closeRegisterModal() {
    if (this.isSubmittingRegister) {
      return;
    }
    this.isRegisterModalOpen = false;
    this.registerForm.reset();
  }

  async onSubmitRegister() {
    if (this.registerForm.invalid || this.isSubmittingRegister) {
      return;
    }

    this.isSubmittingRegister = true;
    this.registerSuccessMessage = '';

    const { nombre, dni, telefono, email } = this.registerForm.value;

    try {
      await this.firestoreService.createFreeUser({
        nombre,
        dni,
        telefono,
        email,
      });

      this.registerSuccessMessage =
        'Tu solicitud fue enviada correctamente. Una vez aprobada por el equipo de Agrofono podrás ingresar. Si después de un tiempo no recibís confirmación, comunicate por WhatsApp.';
      this.registerForm.reset();
    } catch (error) {
      console.error('Error al registrar usuario gratuito:', error);
      this.registerSuccessMessage = 'Ocurrió un error al enviar tu solicitud. Intentá nuevamente más tarde.';
    } finally {
      this.isSubmittingRegister = false;
    }
  }


}
