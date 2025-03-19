import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {

  constructor(private router: Router, private authService: AuthService) {}
    // Navegar entre vistas
    navigateTo(route: string): void {
      this.router.navigate([`/${route}`]);
    }

  handleAction(action: string) {
    console.log(`Acción seleccionada: ${action}`);
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

}
