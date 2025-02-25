import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.css']
})
export class LoginPage {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      dni: ['', [Validators.required, Validators.minLength(7), Validators.maxLength(10)]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      console.log('✅ Formulario válido', this.loginForm.value);
    } else {
      console.log('❌ Formulario inválido');
    }
  }
}
