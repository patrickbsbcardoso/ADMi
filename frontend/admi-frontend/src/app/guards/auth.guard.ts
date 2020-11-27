import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private router: Router
  ) { }

  canActivate(rota: ActivatedRouteSnapshot, estado: RouterStateSnapshot): Observable<boolean> | boolean {
    if (sessionStorage.getItem('usuarioLogado')) {
      return true;
    }

    this.router.navigate(['/']);
  }
}
