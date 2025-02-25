import { Component } from '@angular/core';
import { NavbarComponent } from "../navbar/navbar.component";
import { FooterComponent } from "../footer/footer.component";
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-asesoria',
  standalone: true,
  imports: [NavbarComponent, FooterComponent,CommonModule],
  templateUrl: './asesoria.component.html',
  styleUrl: './asesoria.component.scss'
})
export class AsesoriaComponent {

faqOpen: { [key: number]: boolean } = {};

  toggleFAQ(index: number) {
    this.faqOpen[index] = !this.faqOpen[index];
  }

}





