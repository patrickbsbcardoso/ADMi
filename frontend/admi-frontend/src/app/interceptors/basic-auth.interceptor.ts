import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class BasicAuthInterceptor implements HttpInterceptor {
  intercept(requisicao: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let usuarioLogado = JSON.parse(sessionStorage.getItem('usuarioLogado'));

    if ((new RegExp('admi').test(requisicao.url))) {
      //console.log('entrou');

      if (usuarioLogado && usuarioLogado.authdata) {
        requisicao = requisicao.clone({
          setHeaders: {
            Authorization: `Basic ${usuarioLogado.authdata}`
          }
        });
      }
    }
    //console.log(requisicao.headers);

    return next.handle(requisicao);
  }
}
