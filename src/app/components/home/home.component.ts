import { Component } from '@angular/core';
import { NavbarComponent } from "../navbar/navbar.component";
import { HeroSectionComponent } from "../hero-section/hero-section.component";
import { TextoComponent } from "../texto/texto.component";
import { ServicesComponent } from "../services/services.component";
import { FooterComponent } from "../footer/footer.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NavbarComponent, HeroSectionComponent, TextoComponent, ServicesComponent, FooterComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
