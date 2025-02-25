import { Component } from '@angular/core';
import { NavbarComponent } from "../navbar/navbar.component";
import { FooterComponent } from "../footer/footer.component";
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-suscripciones-tecnicas',
   standalone: true,
  imports: [NavbarComponent, FooterComponent,CommonModule],
  templateUrl: './suscripciones-tecnicas.component.html',
  styleUrl: './suscripciones-tecnicas.component.scss'
})
export class SuscripcionesTecnicasComponent {

faqOpen: { [key: number]: boolean } = {};

  toggleFAQ(index: number) {
    this.faqOpen[index] = !this.faqOpen[index];
  }
}
