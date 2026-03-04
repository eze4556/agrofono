import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-home-logeado',
  standalone: true,
  imports: [],
  templateUrl: './home-logeado.component.html',
  styleUrl: './home-logeado.component.scss'
})
export class HomeLogeadoComponent implements OnInit {
  userName: string = '';

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit(): void {
    this.userName = this.authService.userName;
  }

  navigateTo(route: string): void {
    this.router.navigate([`/${route}`]);
  }
}

