import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private loggedIn = new BehaviorSubject<boolean>(this.hasCurrentUser());
  isLoggedIn$ = this.loggedIn.asObservable();

  // Verificar si hay un usuario en localStorage
  private hasCurrentUser(): boolean {
    return !!localStorage.getItem('currentUser');
  }

  // Actualizar el estado de autenticación
  login(userData: any): void {
    localStorage.setItem('currentUser', JSON.stringify(userData));
    this.loggedIn.next(true);
  }


  logout(): void {
    localStorage.removeItem('currentUser');
    this.loggedIn.next(false);
  }


  get isLoggedIn(): boolean {
    return this.loggedIn.getValue();
  }

  get currentUser(): any {
    const user = localStorage.getItem('currentUser');
    return user ? JSON.parse(user) : null;
  }

  get userName(): string {
    return this.currentUser?.nombre || 'Usuario';
  }


}
