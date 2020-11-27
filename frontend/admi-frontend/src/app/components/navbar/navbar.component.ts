import { Component, OnInit } from '@angular/core';

import { MenuItem } from 'primeng/api';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  visivel: boolean = false;
  itens: MenuItem[];

  constructor(
    private auth: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    if(sessionStorage.getItem('roleUsuario') == 'ADMIN') {
      this.itens = [
        { label: 'Home',
          items: [
            { label: 'Página Home', icon: 'pi pi-fw pi-home', command: (event) => this.irHomePage(), },
          ]
       },
        {
          label: 'Membros',
          icon: 'pi pi-fw pi-users',
          items: [
            { label: 'Cadastrar Membro', icon: 'pi pi-fw pi-plus', command: (event) => this.irCadMembro() },
            { label: 'Listar Membros', icon: 'pi pi-fw pi-list', command: (event) => this.irListaMembro() }
          ]
        },
        {
          label: 'Usuários',
          icon: 'pi pi-fw pi-user',
          items: [
            { label: 'Cadastrar Usuário', icon: 'pi pi-fw pi-user-plus', command: (event) => this.irCadUsuario() },
            { label: 'Listar Usuários', icon: 'pi pi-fw pi-list', command: (event) => this.irListaUsuario() }
          ]
        },
        {
          label: 'Relatórios',
          icon: 'pi pi-fw pi-file',
          items: [
            { label: 'Aniversariantes do mês', icon: 'pi pi-fw pi-calendar', command: (event) => this.irRelatorioAniversario() },
          ]
        },
        { label: 'Sair',
          items: [
            { label: 'Sair do Sistema', icon: 'pi pi-fw pi-sign-out', command: (event) => this.sair() },
          ]
        }
      ];
    } else if (sessionStorage.getItem('roleUsuario') == 'USUARIO') {
      this.itens = this.itens = [
        { label: 'Home',
          items: [
            { label: 'Página Home', icon: 'pi pi-fw pi-home', command: (event) => this.irHomePage(), },
          ]
       },
        {
          label: 'Membros',
          icon: 'pi pi-fw pi-users',
          items: [
            { label: 'Cadastrar Membro', icon: 'pi pi-fw pi-plus', command: (event) => this.irCadMembro() },
            { label: 'Listar Membros', icon: 'pi pi-fw pi-list', command: (event) => this.irListaMembro() }
          ]
        },
        {
          label: 'Relatórios',
          icon: 'pi pi-fw pi-file',
          items: [
            { label: 'Aniversariantes do mês', icon: 'pi pi-fw pi-calendar', command: (event) => this.irRelatorioAniversario() },
          ]
        },
        { label: 'Sair',
          items: [
            { label: 'Sair do Sistema', icon: 'pi pi-fw pi-sign-out', command: (event) => this.sair() },
          ]
        }
      ];
    }
  }

  irCadMembro(): void {
    this.router.navigate(['/cadastra_membro']);
  }
  irListaMembro(): void {
    this.router.navigate(['/lista_membro']);
  }
  irCadUsuario(): void {
    this.router.navigate(['/cadastra_usuario']);
  }
  irListaUsuario(): void {
    this.router.navigate(['/lista_usuario']);
  }
  irRelatorioAniversario(): void {
    this.router.navigate(['/aniversariante_info']);
  }
  sair() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
  abreSideMenu() {
    this.visivel = true;
  }
  irHomePage() {
    this.router.navigate(['/home']);
  }
}
