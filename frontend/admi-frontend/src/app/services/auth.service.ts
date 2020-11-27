import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { ModeloUsuario } from '../models/modelo-usuario';
import { AdmiApiService } from './admi-api.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient,
    private admiApi: AdmiApiService
  ) { }

  login(usuario: ModeloUsuario) {
    return this.admiApi.getUsuario(usuario)
      .pipe(
        map(
          user => {
            if (user) {
              user.authdata = window.btoa(usuario.usuario + ':' + usuario.senha);
              sessionStorage.setItem('usuarioLogado', JSON.stringify(user));
              sessionStorage.setItem('roleUsuario', user.role);
            }
          }
        )
      );
  }

  logout() {
    sessionStorage.removeItem('usuarioLogado');
    sessionStorage.removeItem('roleUsuario');
  }

}
