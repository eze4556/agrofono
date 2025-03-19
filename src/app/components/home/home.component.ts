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


                // Detectar apertura de DevTools
                setInterval(() => {
                  if (window.outerWidth - window.innerWidth > 160 || window.outerHeight - window.innerHeight > 160) {
                    alert('No intentes inspeccionar la página.');
                    window.location.href = 'https://tusitio.com/bloqueado';
                  }
                }, 1000);

                    // Detectar uso de debugger
                    setInterval(() => {
                      const antes = new Date().getTime();
                      debugger;
                      const despues = new Date().getTime();
                      if (despues - antes > 200) {
                        alert('Inspección detectada. Redirigiendo...');
                        window.location.href = 'https://tusitio.com/bloqueado';
                      }
                    }, 500);
  }

}
