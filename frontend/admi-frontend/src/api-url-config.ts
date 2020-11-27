import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class ApiUrlConfig {
  API_URL = 'http://admiapp.com.br:8080/admi';
  USUARIO_URL = '/usuarios';
  MEMBRO_URL = '/membros';
}
