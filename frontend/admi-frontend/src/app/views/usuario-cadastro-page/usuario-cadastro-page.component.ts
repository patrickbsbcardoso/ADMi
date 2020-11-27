import { Component, OnInit } from '@angular/core';
import { AdmiApiService } from '../../services/admi-api.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SelectItem } from 'primeng/api';

@Component({
  selector: 'app-usuario-cadastro-page',
  templateUrl: './usuario-cadastro-page.component.html',
  styleUrls: ['./usuario-cadastro-page.component.css']
})
export class UsuarioCadastroPageComponent implements OnInit {

  formUsuario: FormGroup;

  dialogoPopUp: boolean;
  msgPopUp: string;
  cabecalhoPopUp;

  tipoUsuario: SelectItem[];
  carregando: boolean;

  constructor(
    private admiApi: AdmiApiService,
    private formBuilder: FormBuilder,
    private router: Router
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

  }

  onSubmit() {
    if (this.formUsuario.valid) {
      this.carregando = true;
      this.admiApi.insertUsuario(this.formUsuario.value).subscribe(
        resultado => {
          this.carregando = false;
          this.mostraMsg('Usuário cadastrado com sucesso!', 'Sucesso!');
        },
        erro => {
          if (erro.error === 'ERRO_GENERICO') {
            this.carregando = false;
            this.mostraErro('Houve um erro, tente novamente');
          }
          if (erro.error === 'USUARIO_DUPLICADO') {
            this.carregando = false;
            this.mostraErro('O usuário já existe, tente outro nome');
          }
        }
      );
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

  voltaHome() {
    this.router.navigate(['/home']);
  }
}
