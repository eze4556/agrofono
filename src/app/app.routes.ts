import { Routes } from "@angular/router";
import { AsesoriaComponent } from "./components/asesoria/asesoria.component";
import { HomeComponent } from "./components/home/home.component";
import { provideRouter, RouterModule } from "@angular/router";
import { SuscripcionesTecnicasComponent } from "./components/suscripciones-tecnicas/suscripciones-tecnicas.component";
import { AboutUsComponent } from "./components/about-us/about-us.component";
import { LoginPage } from "./pages/login/login.page";
import { ProfileComponent } from "./components/profile/profile.component";
import { SuscripcionComponent } from "./components/suscripcion/suscripcion.component";
import { ConsultasComponent } from "./components/consultas/consultas.component";
import { HomeLogeadoComponent } from "./components/home-logeado/home-logeado.component";
import { ConsultasTecnicosComponent } from "./components/consultas-tecnicos/consultas-tecnicos.component";
import { ComputadorasComponent } from "./components/computadoras/computadoras.component";
import { ComputadoraDetalleComponent } from "./components/computadora-detalle/computadora-detalle.component";
import { ConsultaTecComponent } from "./components/consulta-tec/consulta-tec.component";




export const routes: Routes = [
  { path: "home", component: HomeComponent },
  { path: "asesoria", component: AsesoriaComponent },
  { path: "suscripcionesTecnicas", component: SuscripcionesTecnicasComponent },
  { path: "nosotros", component: AboutUsComponent },
  { path: "login", component: LoginPage },
  { path: "profile", component: ProfileComponent },
  { path: "suscripcion", component: SuscripcionComponent },
  { path: "consulta", component: ConsultasComponent },
  { path: "consulta-tec", component: ConsultaTecComponent },
  { path: "home-tecnico", component: HomeLogeadoComponent },
  { path: "consulta-tecnico", component: ConsultasTecnicosComponent },
  { path: "computadoras", component: ComputadorasComponent },
  { path: "computadoras/:id", component: ComputadoraDetalleComponent }, // Nueva ruta
  { path: "", redirectTo: "home", pathMatch: "full" },
];
export const AppRoutingModule = RouterModule.forRoot(routes);
