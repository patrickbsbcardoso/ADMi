import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AdmiApiService } from '../../services/admi-api.service';
import { Router } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { ModeloUsuario } from 'src/app/models/modelo-usuario';

@Component({
  selector: 'app-lista-usuario-page',
  templateUrl: './lista-usuario-page.component.html',
  styleUrls: ['./lista-usuario-page.component.css']
})
export class ListaUsuarioPageComponent implements OnInit {


  @ViewChild('tabela', {static: false}) tabela: ElementRef;

  usuarios: ModeloUsuario[];
  colunas: any[];
  linhaSelecionada;
  habilitaBotao = true;
  cabecalhoPopUp: string;
  msgPopUp: string;
  dialogoPopUp: boolean;

  carregando: boolean;

  constructor(
    private admiApi: AdmiApiService,
    private router: Router,
    private confirmationService: ConfirmationService
  ) { }

  ngOnInit() {
    this.getUsuarios();
    this.colunas = [
      { campo: 'usuario', cabecalho: 'Usuário'},
      { campo: 'role', cabecalho: 'Tipo de Usuário'},
    ];


  }

  getUsuarios() {
    this.carregando = true;
    this.admiApi.getUsuarios().subscribe(
      resultado => {
        this.usuarios = resultado;
        this.carregando = false;
      },
      erro => {
        this.carregando = false;
        this.mostraErro('Houve um erro, tente recarregar a página');
       }
    );
  }

  excluiUsuario() {
    this.confirmationService.confirm({
      header: 'Atenção!',
      message: 'Você está prestes a excluir um usuario, essa operação não poderá ser revertida. Deseja continuar?',
      acceptLabel: 'Sim',
      rejectLabel: 'Não',
      accept: () => {
        this.carregando = true;
        this.admiApi.deleteUsuario(this.linhaSelecionada).subscribe(
          resultado => {
            this.usuarios = null;
            this.getUsuarios();
            this.carregando = false;
            this.mostraMsg('Usuario excluído com sucesso', 'Sucesso!');
          },
          erro => {
            this.carregando = false;
            this.mostraErro('Houve um erro, tente novamente');
           }
        );
      }
    });
  }

  voltaHome() {
    this.router.navigate(['/home']);
  }

  irCadastroUsuario() {
    this.router.navigate(['/cadastra_usuario']);
  }

  mostraErro(erro: string) {
    this.cabecalhoPopUp = 'Erro';
    this.msgPopUp = erro;
    this.dialogoPopUp = true;
  }

  mostraMsg(msg: string, cabecalho: string) {
    this.cabecalhoPopUp = cabecalho;
    this.msgPopUp = msg;
    this.dialogoPopUp = true;
  }

  irEditaUsuario() {
    let usuarioAEditar = this.linhaSelecionada;
    usuarioAEditar.senha = '';
    sessionStorage.setItem('usuarioAEditar', JSON.stringify(usuarioAEditar));
    this.router.navigate(['/edita_usuario']);
  }

}
