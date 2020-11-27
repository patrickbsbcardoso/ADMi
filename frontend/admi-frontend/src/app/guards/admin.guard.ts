import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(
    private router: Router
  ) {}

  canActivate(
    rota: ActivatedRouteSnapshot,
    estado: RouterStateSnapshot): Observable<boolean> | boolean {
    if (sessionStorage.getItem('roleUsuario') == 'ADMIN') {
      return true;
    }

    this.router.navigate(['/home']);
  }

}
