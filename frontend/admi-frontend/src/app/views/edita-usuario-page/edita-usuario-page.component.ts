import { Component, OnInit } from '@angular/core';
import { AdmiApiService } from '../../services/admi-api.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SelectItem, ConfirmationService } from 'primeng/api';
import { ModeloUsuario } from 'src/app/models/modelo-usuario';

@Component({
  selector: 'app-edita-usuario-page',
  templateUrl: './edita-usuario-page.component.html',
  styleUrls: ['./edita-usuario-page.component.css']
})
export class EditaUsuarioPageComponent implements OnInit {

  formUsuario: FormGroup;
  usuarioAEditar: ModeloUsuario;
  usuarioIdBackup;

  dialogoPopUp: boolean;
  msgPopUp: string;
  cabecalhoPopUp;

  tipoUsuario: SelectItem[];

  carregando: boolean;

  constructor(
    private admiApi: AdmiApiService,
    private formBuilder: FormBuilder,
    private router: Router,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit() {

    const fb = this.formBuilder;
    this.formUsuario = fb.group({
      usuario: [null, [Validators.required]],
      senha: [null, [Validators.required, Validators.minLength(8)]],
      role: [null, [Validators.required]]
    });

    this.tipoUsuario = [
      {label: '', value: null},
      {label: 'Comum', value: 'USUARIO'},
      {label: 'Administrador', value: 'ADMIN'}
    ];

    this.usuarioAEditar = JSON.parse(sessionStorage.getItem('usuarioAEditar')) as ModeloUsuario;
    this.usuarioIdBackup = this.usuarioAEditar.id;
    this.formUsuario.patchValue(this.usuarioAEditar);
    sessionStorage.removeItem('usuarioAEditar');

  }

  onSubmit() {
    if (this.formUsuario.valid) {
      this.confirmationService.confirm({
        header: 'Atenção!',
        message: 'Você está prestes a editar o cadastro de um usuário. Deseja continuar?',
        acceptLabel: 'Sim',
        rejectLabel: 'Não',
        accept: () => {
          this.carregando = true;
          this.usuarioAEditar = this.formUsuario.value;
          this.usuarioAEditar.id = this.usuarioIdBackup;
          this.admiApi.updateUsuario(this.usuarioAEditar).subscribe(
            resultado => {
              this.carregando = false;
              this.mostraMsg('Informações salvas com sucesso!', 'Sucesso!');
            },
            erro => {
              if (erro === 'VALOR_INVALIDO') {
                this.carregando = false;
                this.mostraErro('Há algum valor inválido. Por favor, preencha os campos corretamente');
              } else if (erro === 'USUARIO_DUPLICADO') {
                this.carregando = false;
                this.mostraErro('O usuário já existe, tente outro nome');
              } else {
                this.carregando = false;
                this.mostraErro('Houve um erro, tente novamente');
              }
            }
          );
        }
      });
    } else {
      this.carregando = false;
      this.mostraErro('Preencha todos os campos corretamente');
    }
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

  resetaForm() {
    this.formUsuario.reset();
  }

  voltaLista() {
    this.router.navigate(['/lista_usuario']);
  }
}
