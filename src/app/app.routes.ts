import { Routes } from "@angular/router";
import { HomeComponent } from "./components/home/home.component";
import { provideRouter, RouterModule } from "@angular/router";
import { AboutUsComponent } from "./components/about-us/about-us.component";
import { LoginPage } from "./pages/login/login.page";
import { ProfileComponent } from "./components/profile/profile.component";
import { ConsultasComponent } from "./components/consultas/consultas.component";
import { HomeLogeadoComponent } from "./components/home-logeado/home-logeado.component";
import { ConsultasTecnicosComponent } from "./components/consultas-tecnicos/consultas-tecnicos.component";
import { ComputadorasComponent } from "./components/computadoras/computadoras.component";
import { ComputadoraDetalleComponent } from "./components/computadora-detalle/computadora-detalle.component";
import { ConsultaTecComponent } from "./components/consulta-tec/consulta-tec.component";
import { MisConsultasComponent } from "./components/mis-consultas/mis-consultas.component";
import { AuthGuard } from "./guards/auth.guard";

export const routes: Routes = [
  // Rutas públicas
  { path: "home", component: HomeComponent },
  { path: "nosotros", component: AboutUsComponent },
  { path: "login", component: LoginPage },
  // { path: "consulta", component: ConsultasComponent },

  // Rutas protegidas — requieren login
  { path: "home-tecnico", component: HomeLogeadoComponent, canActivate: [AuthGuard] },
  { path: "profile", component: ProfileComponent, canActivate: [AuthGuard] },
  { path: "consulta-tec", component: ConsultaTecComponent, canActivate: [AuthGuard] },
  { path: "mis-consultas", component: MisConsultasComponent, canActivate: [AuthGuard] },
  { path: "consulta-tecnico", component: ConsultasTecnicosComponent, canActivate: [AuthGuard] },
  { path: "computadoras", component: ComputadorasComponent, canActivate: [AuthGuard] },
  { path: "computadoras/:id", component: ComputadoraDetalleComponent, canActivate: [AuthGuard] },

  // Redirects temporales — rutas de suscripción eliminadas (evitan 404)
  { path: "suscripcionesTecnicas", redirectTo: "", pathMatch: "full" },
  { path: "suscripcion", redirectTo: "", pathMatch: "full" },
  { path: "mi-suscripcion", redirectTo: "", pathMatch: "full" },

  // Ruta por defecto y wildcard
  { path: "", redirectTo: "home", pathMatch: "full" },
  { path: "**", redirectTo: "home" },
];

export const AppRoutingModule = RouterModule.forRoot(routes);
