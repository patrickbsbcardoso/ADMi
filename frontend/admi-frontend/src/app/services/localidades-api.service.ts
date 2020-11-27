import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocalidadesApiService {

  estadosUrl = 'https://servicodados.ibge.gov.br/api/v1/localidades/estados';
  municipioUrl = '/municipios';
  viaCepUrl = 'https://viacep.com.br/ws/';


  constructor(
    private http: HttpClient
  ) { }


  getEstados(): Observable<any> {
    return this.http.get(this.estadosUrl);
  }

  async getCidades(uf: string) {
    return this.http.get(this.estadosUrl + '/' + uf + this.municipioUrl).toPromise();
  }

  getEndereco(cep: string): Observable<any> {
    return this.http.get(this.viaCepUrl + cep + '/json/');
  }
}
