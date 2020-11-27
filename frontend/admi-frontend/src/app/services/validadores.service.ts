import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidadoresService {

  constructor() { }

  static cpf(control: FormControl) {
    let cpf: string = control.value;
    const listaNegraCPF = [
      '00000000000',
      '11111111111',
      '22222222222',
      '33333333333',
      '44444444444',
      '55555555555',
      '66666666666',
      '77777777777',
      '88888888888',
      '99999999999',
      '12345678909',
      '01234567890'
    ];
    if (cpf) {
      let soma: number = 0;
      let resto: number = 0;
      let index: number = 0;

      cpf = cpf.replace(/\D+/g, '');

      if (cpf.length !== 11) {
        return { cpfInvalido : true };
      } else {
        for (let item of listaNegraCPF) {
          if (cpf === item) {
            return { cpfInvalido : true };
          }
        }
        for (let c = 10; c > 1; c--) {
          soma += parseInt(cpf.charAt(index), 10) * c;
          index++;
        }
        index = 0;
        soma = soma * 10;
        resto = soma % 11;
        if (resto === 10) {
          resto = 0;
        }
        soma = 0;
        if (resto === parseInt(cpf.charAt(9), 10)) {
          for (let d = 11; d > 1; d--) {
            soma += parseInt(cpf.charAt(index), 10) * d;
            index++;
          }
          soma = soma * 10;
          resto = soma % 11;
          if (resto === 10) {
            resto = 0;
          }
          if (resto === parseInt(cpf.charAt(10), 10)) {
            return null;
          } else {
            return { cpfInvalido : true };
          }
        } else {
          return { cpfInvalido : true };
        }
      }
    }
  }

  static rg(control: FormControl) {
    let rg: string = control.value;
    const listaNegraRG = [
      '000000000',
      '111111111',
      '222222222',
      '333333333',
      '444444444',
      '555555555',
      '666666666',
      '777777777',
      '888888888',
      '999999999'
    ];
    if (rg) {

      rg = rg.replace(/\D+/g, '');

      if (rg.length !== 9) {
        return { rgInvalido : true };
      } else {
        for (let item of listaNegraRG) {
          if (rg === item) {
            return { cpfInvalido : true };
          }
        }
        return null;
      }
    }
  }


}
