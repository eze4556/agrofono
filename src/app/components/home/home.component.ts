import { Component, OnInit } from '@angular/core';
import { HeroSectionComponent } from "../hero-section/hero-section.component";
import { TextoComponent } from "../texto/texto.component";
import { ServicesComponent } from "../services/services.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeroSectionComponent, TextoComponent, ServicesComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  ngOnInit(): void {

  }

}
