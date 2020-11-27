import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { ModeloUsuario } from '../models/modelo-usuario';
import { ModeloMembro } from '../models/modelo-membro';
import { ApiUrlConfig } from '../../api-url-config';

@Injectable({
  providedIn: 'root'
})
export class AdmiApiService {

  constructor(
    private http: HttpClient,
    private apiUrl: ApiUrlConfig
  ) { }

  getUsuario(usuario: ModeloUsuario): Observable<any> {
    return this.http.post(this.apiUrl.API_URL + this.apiUrl.USUARIO_URL + '/usuario', usuario);
  }

  getUsuarios(): Observable<any> {
    return this.http.get(this.apiUrl.API_URL + this.apiUrl.USUARIO_URL);
  }

  insertUsuario(usuario: ModeloUsuario): Observable<any> {
    return this.http.post<ModeloUsuario>(this.apiUrl.API_URL + this.apiUrl.USUARIO_URL, usuario);
  }

  updateUsuario(usuario: ModeloUsuario): Observable<any> {
    return this.http.put<ModeloUsuario>(this.apiUrl.API_URL + this.apiUrl.USUARIO_URL, usuario);
  }

  deleteUsuario(usuario: ModeloUsuario): Observable<any> {
    return this.http.delete(this.apiUrl.API_URL + this.apiUrl.USUARIO_URL + '/' + usuario.id);
  }

  insertMembro(membro: ModeloMembro): Observable<any> {
    return this.http.post<ModeloMembro>(this.apiUrl.API_URL + this.apiUrl.MEMBRO_URL, membro);
  }

  getMembros(): Observable<any> {
    return this.http.get(this.apiUrl.API_URL + this.apiUrl.MEMBRO_URL);
  }

  deleteMembro(membro: ModeloMembro): Observable<any> {
    return this.http.delete(this.apiUrl.API_URL + this.apiUrl.MEMBRO_URL + '/' + membro.id);
  }

  updateMembro(membro: ModeloMembro): Observable<any> {
    return this.http.put<ModeloMembro>(this.apiUrl.API_URL + this.apiUrl.MEMBRO_URL, membro);
  }

}
