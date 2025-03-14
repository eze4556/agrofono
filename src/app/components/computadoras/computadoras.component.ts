import { Component, OnInit } from '@angular/core';
import { FirestoreService } from '../../services/firestore.service';
import { Computadoras } from '../../models/computadora.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-computadoras',
  standalone: true,
  templateUrl: './computadoras.component.html',
  styleUrls: ['./computadoras.component.scss'],
  imports:[CommonModule,FormsModule]
})
export class ComputadorasComponent implements OnInit {
  computadoras: Computadoras[] = [];

  constructor(private firestoreService: FirestoreService) {}

  async ngOnInit() {
    this.computadoras = await this.firestoreService.getComputadoras();
  }
}
