import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InfoMembroGuard implements CanActivate {
  constructor(
    private router: Router
  ) {}

  canActivate(
    rota: ActivatedRouteSnapshot,
    estado: RouterStateSnapshot): Observable<boolean> | boolean {
    if (sessionStorage.getItem('membroInfo')) {
      return true;
    }

    this.router.navigate(['/lista_membro']);
  }


}
