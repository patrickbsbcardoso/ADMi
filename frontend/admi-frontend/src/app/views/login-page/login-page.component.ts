import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ModeloUsuario } from '../../models/modelo-usuario';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

  loginForm: FormGroup;
  loginErro: boolean;
  carregandoLogin: boolean;
  msgErro: string;


  constructor(
    private formBuilder: FormBuilder,
    private roteador: Router,
    private auth: AuthService
  ) { }

  ngOnInit() {
    const fb = this.formBuilder;

    this.loginForm = fb.group({
      usuario: [null, Validators.required ],
      senha: [null, Validators.required ]
    });

    this.auth.logout();
  }

  onSubmit(form) {
    if (this.loginForm.valid) {
      this.carregandoLogin = true;
      const usuario: ModeloUsuario = form.value;
      this.auth.login(usuario).subscribe(
        resultado => {
          this.carregandoLogin = false;
          this.roteador.navigate(['/home']);
        },
        error => {
          console.log(error.status);
          if (error.status === 401) {
              this.carregandoLogin = false;
              this.msgErro = 'Usuário e/ou senha inválidos';
              this.loginErro = true;
            } else {
              this.carregandoLogin = false;
              this.msgErro = 'Houve algum erro na comunicação com o servidor, tente novamente';
              this.loginErro = true;
            }
        }
      );
    } else {
      this.msgErro = 'Preencha todos os campos corretamente';
      this.loginErro = true;
    }
  }
}
