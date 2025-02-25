import { Routes } from "@angular/router";
import { AsesoriaComponent } from "./components/asesoria/asesoria.component";
import { HomeComponent } from "./components/home/home.component";
import { provideRouter, RouterModule } from "@angular/router";
import { SuscripcionesTecnicasComponent } from "./components/suscripciones-tecnicas/suscripciones-tecnicas.component";
import { AboutUsComponent } from "./components/about-us/about-us.component";
import { LoginPage } from "./pages/login/login.page";
import { ProfileComponent } from "./components/profile/profile.component";



export const routes: Routes = [
  { path: "home", component: HomeComponent },
  { path: "asesoria", component: AsesoriaComponent },
  { path: "suscripcionesTecnicas", component: SuscripcionesTecnicasComponent },
  { path: "nosotros", component: AboutUsComponent },
  { path: "login", component: LoginPage },
  { path: "profile", component: ProfileComponent },

  { path: "", redirectTo: "home", pathMatch: "full" },
];
export const AppRoutingModule = RouterModule.forRoot(routes);
