import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../../services/auth.service';



@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit {
  isMenuOpen = false;
  isLoggedIn = false;
  private authSubscription: Subscription | undefined;
  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit(): void {
    // Inicializar estado
    this.isLoggedIn = this.authService.isLoggedIn;

    // Suscribirse a cambios
    this.authSubscription = this.authService.isLoggedIn$.subscribe(
      (status) => {
        this.isLoggedIn = status;
      }
    );
  }


  ngOnDestroy(): void {
    // Limpiar la suscripción
    this.authSubscription?.unsubscribe();
  }

  navigateTo(route: string): void {
    this.router.navigate([`/${route}`]);
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }
}
