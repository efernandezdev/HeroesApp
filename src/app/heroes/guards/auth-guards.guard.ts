import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardsGuard implements CanActivate, CanActivateChild {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    if (this.authService.LoggedIn()) {
      return true;
    }
    this.router.navigate(['/login']);
    return false;
  }
  
  canActivateChild(): boolean {
    if (this.authService.LoggedIn()) {
      return true;
    }
    this.router.navigate(['/login']);
    return false;
  }
}
