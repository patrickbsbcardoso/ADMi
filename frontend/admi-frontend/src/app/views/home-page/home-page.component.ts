import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  usuarioAdmin: boolean = false;

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
    if (sessionStorage.getItem('roleUsuario') == 'ADMIN') {
      this.usuarioAdmin = true;
    } else if ((sessionStorage.getItem('roleUsuario') == 'USUARIO')) {
      this.usuarioAdmin = false;
    }
  }

  irCadMembro() {
    this.router.navigate(['/cadastra_membro']);
  }

  irListaMembro() {
    this.router.navigate(['/lista_membro']);

  }
  irCadUsuario() {
    this.router.navigate(['/cadastra_usuario']);
  }
  irListaUsuario() {
    this.router.navigate(['/lista_usuario']);
  }
  irAniversarioRelatorio() {
    this.router.navigate(['/aniversariante_info']);
  }

}
