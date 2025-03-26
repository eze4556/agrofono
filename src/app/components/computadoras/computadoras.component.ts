import { Component, HostListener, OnInit } from '@angular/core';
import { FirestoreService } from '../../services/firestore.service';
import { Computadoras } from '../../models/computadora.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-computadoras',
  standalone: true,
  templateUrl: './computadoras.component.html',
  styleUrls: ['./computadoras.component.scss'],
  imports: [CommonModule, FormsModule],
})
export class ComputadorasComponent implements OnInit {
  computadoras: Computadoras[] = [];
  filteredComputadoras: Computadoras[] = [];
  selectedComputadora: Computadoras | null = null;
  paginatedComputadoras: Computadoras[] = [];
  currentPage: number = 0;
  itemsPerPage: number = 15;
  isMobileView: boolean = false;

  constructor(
    private firestoreService: FirestoreService,
    private router: Router,
    private authService: AuthService
  ) {}

  async ngOnInit() {
    if (!this.authService.isLoggedIn) {
      this.router.navigate(['/home']);
    }

    this.computadoras = await this.firestoreService.getComputadoras();
    this.filteredComputadoras = this.computadoras;
    this.updatePagination();
    this.checkMobileView();
  }

  filterComputadoras(tipo: string): void {
    this.filteredComputadoras = this.computadoras.filter(
      (computadora) => computadora.tipo_pc === tipo
    );
    this.currentPage = 0;
    this.updatePagination();
  }

  updatePagination(): void {
    const start = this.currentPage * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    this.paginatedComputadoras = this.filteredComputadoras.slice(start, end);
  }

  goToPage(page: number): void {
    this.currentPage = page;
    this.updatePagination();
  }

  selectComputadora(computadora: Computadoras): void {
    this.selectedComputadora = computadora;
    console.log('Computadora seleccionada:', computadora);
  }

  @HostListener('window:resize', ['$event'])
  checkMobileView(): void {
    this.isMobileView = window.innerWidth <= 768;
  }

  get totalPages(): number[] {
    return Array.from(
      { length: Math.ceil(this.filteredComputadoras.length / this.itemsPerPage) },
      (_, i) => i
    );
  }
}
