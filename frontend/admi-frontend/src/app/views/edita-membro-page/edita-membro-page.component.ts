import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { SelectItem, ConfirmationService } from 'primeng/api';
import { LocalidadesApiService } from '../../services/localidades-api.service';
import { AdmiApiService } from '../../services/admi-api.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModeloEstado } from 'src/app/models/modelo-estado';
import { ModeloCidade } from 'src/app/models/modelo-cidade';
import { ValidadoresService } from 'src/app/services/validadores.service';
import { Router } from '@angular/router';
import { ModeloMembro } from 'src/app/models/modelo-membro';

@Component({
  selector: 'app-edita-membro-page',
  templateUrl: './edita-membro-page.component.html',
  styleUrls: ['./edita-membro-page.component.css']
})
export class EditaMembroPageComponent implements OnInit, AfterViewInit {

  @ViewChild('labelDataCasamento', {static: false}) labelDataCasamento: ElementRef;
  @ViewChild('labelNomeConjuge', {static: false}) labelNomeConjuge: ElementRef;
  @ViewChild('labelDataBatismo', {static: false}) labelDataBatismo: ElementRef;
  @ViewChild('labelIgrejaBatismo', {static: false}) labelIgrejaBatismo: ElementRef;
  @ViewChild('labelDataBatismoEspSnt', {static: false}) labelDataBatismoEspSnt: ElementRef;
  @ViewChild('labelNomeOutraIgreja', {static: false}) labelNomeOutraIgreja: ElementRef;
  @ViewChild('labelDataConsagracao', {static: false}) labelDataConsagracao: ElementRef;
  @ViewChild('labelLocalConsagracao', {static: false}) labelLocalConsagracao: ElementRef;
  @ViewChild('labelNomeCursoTeo', {static: false}) labelNomeCursoTeo: ElementRef;

  formMembro: FormGroup;
  formLimpo: FormGroup;

  anoAtual: string = new Date().getFullYear().toString();

  sexo: SelectItem[];
  escolaridade: SelectItem[];
  estadoCivil: SelectItem[];
  estados: ModeloEstado[] = [];
  cidades: ModeloCidade[] = [];
  simNao: SelectItem[];
  motivoEntrada: SelectItem[];
  cargoMinisterial: SelectItem[];
  br: any;
  modeloEndereco: any = {
    cep: '',
    endereco: '',
    complemento: '',
    cidade: ModeloCidade,
    estado: ModeloEstado,
    bairro: ''
  };

  estadoSelecionado: ModeloEstado;

  membroSendoEditado: ModeloMembro;
  membroIdBackup;

  dialogoPopUp: boolean;
  msgPopUp: string;
  cabecalhoPopUp;

  carregando: boolean;

  constructor(
    private admiApi: AdmiApiService,
    private localidadeApi: LocalidadesApiService,
    private formBuilder: FormBuilder,
    private router: Router,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit() {

    const fb = this.formBuilder;
    this.formMembro = fb.group({
      nome: [null, [Validators.required, Validators.pattern('^[A-Za-zñÑáéíóúÁÉÍÓÚâêîôûÂÊÎÔÛãõÃÔçÇ ]+$')]],
      sexo: [null, [Validators.required]],
      data_nasc: [null, [Validators.required]],
      rg: [null, [ValidadoresService.rg]],
      cpf: [null, [ValidadoresService.cpf]],
      escolaridade: [null, [Validators.required]],
      profissao: [null, [Validators.pattern('^[A-Za-zñÑáéíóúÁÉÍÓÚâêîôûÂÊÎÔÛãõÃÔçÇ ]+$')]],
      email: [null, [Validators.email]],
      tel_residencial: [null],
      tel_celular: [null],
      cep: [null, [Validators.required]],
      endereco: [null, [Validators.required]],
      num_casa: [null, [Validators.required]],
      complemento: [null],
      estado: [null, [Validators.required]],
      cidade: [null, [Validators.required]],
      bairro: [null, [Validators.required, Validators.pattern('^[A-Za-zñÑáéíóúÁÉÍÓÚâêîôûÂÊÎÔÛãõÃÔçÇ ]+$')]],
      naturalidade: [null, [Validators.required, Validators.pattern('^[A-Za-zñÑáéíóúÁÉÍÓÚâêîôûÂÊÎÔÛãõÃÔçÇ ]+$')]],
      nacionalidade: [null, [Validators.required, Validators.pattern('^[A-Za-zñÑáéíóúÁÉÍÓÚâêîôûÂÊÎÔÛãõÃÔçÇ ]+$')]],
      estado_civil: [null, [Validators.required]],
      data_casamento: [null],
      nome_conjuge: [null],
      nome_pai: [null, [Validators.required, Validators.pattern('^[A-Za-zñÑáéíóúÁÉÍÓÚâêîôûÂÊÎÔÛãõÃÔçÇ ]+$')]],
      nome_mae: [null, [Validators.required, Validators.pattern('^[A-Za-zñÑáéíóúÁÉÍÓÚâêîôûÂÊÎÔÛãõÃÔçÇ ]+$')]],
      batizado: [null, [Validators.required]],
      data_batismo: [null],
      batizado_esp_santo: [null, [Validators.required]],
      data_btsm_espsnt: [null],
      igreja_batismo: [null],
      data_entrada: [null, [Validators.required]],
      motivo_entrada: [null, [Validators.required]],
      carta_mudanca: [null, [Validators.required]],
      vindo_outra_igreja: [null, [Validators.required]],
      nome_outra_igreja: [null],
      ja_foi_membro: [null, [Validators.required]],
      cargo_ministerial: [null, [Validators.required]],
      data_consagracao: [null],
      local_consagracao: [null],
      funcao_eclesiastica: [null],
      curso_teo: [null, [Validators.required]],
      nome_curso_teo: [null]
    });

    this.sexo = [
      {label: '', value: null},
      {label: 'Masculino', value: 'MASCULINO'},
      {label: 'Feminino', value: 'FEMININO'}
    ];

    this.simNao = [
      {label: '', value: null},
      {label: 'Sim', value: 'SIM'},
      {label: 'Não', value: 'NAO'}
    ];

    this.escolaridade = [
      {label: '', value: null},
      {label: 'Analfabeto', value: 'ANALFABETO'},
      {label: 'Alfabetizado', value: 'ALFABETIZADO'},
      {label: 'Ensino Fundamental Incompleto', value: 'EF_INCOMPLETO'},
      {label: 'Ensino Fundamental Completo', value: 'EF_COMPLETO'},
      {label: 'Ensino Médio Incompleto', value: 'EM_INCOMPLETO'},
      {label: 'Ensino Médio Completo', value: 'EM_COMPLETO'},
      {label: 'Ensino Superior Incompleto', value: 'ES_INCOMPLETO'},
      {label: 'Ensino Superior Completo', value: 'ES_COMPLETO'},
      {label: 'Pós-Graduado', value: 'POS_GRADUADO'},
      {label: 'Mestrado', value: 'MESTRADO'},
      {label: 'Doutorado', value: 'DOUTORADO'},
      {label: 'Pós-Doutorado', value: 'POS_DOUTORADO'},
    ];



    this.estadoCivil = [
      {label: '', value: null},
      {label: 'Solteiro', value: 'SOLTEIRO'},
      {label: 'Casado', value: 'CASADO'},
      {label: 'Viúvo', value: 'VIUVO'},
      {label: 'Separado Judicialmente', value: 'SEPARADO'},
      {label: 'Divorciado', value: 'DIVORCIADO'},
    ];

    this.motivoEntrada = [
      {label: '', value: null},
      {label: 'Reconciliação', value: 'RECONCILIACAO'},
      {label: 'Carta de mudança', value: 'CARTA_MUDANCA'},
      {label: 'Outros', value: 'OUTRO'},
    ];

    this.cargoMinisterial = [
      {label: '', value: null},
      {label: 'Membro', value: 'MEMBRO'},
      {label: 'Cooperador(a)', value: 'COOPERADOR'},
      {label: 'Obreiro(a)', value: 'OBREIRO'},
      {label: 'Diácono(iza)', value: 'DIACONO'},
      {label: 'Presbítero', value: 'PRESBITERO'},
      {label: 'Evangelista', value: 'EVANGELISTA'},
      {label: 'Missionário(a)', value: 'MISSIONARIO'},
      {label: 'Pastor(a)', value: 'PASTOR'},
    ];

    this.br = {
      firstDayOfWeek: 0,
            dayNames: ['Domingo', 'Segunda-Feira', 'Terça-Feira', 'Quarta-Feira', 'Quinta-Feira', 'Sexta-Feira', 'Sábado'],
            dayNamesShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'],
            dayNamesMin: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'],
            // tslint:disable-next-line: max-line-length
            monthNames: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
            monthNamesShort: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
            today: 'Hoje',
            clear: 'Limpar'
    };
    this.preparaFormulario();
    this.formMembro.updateValueAndValidity();
  }

  ngAfterViewInit() {
      this.escolheEstadoCivil();
      this.escolheBatizado();
      this.escolheBatizadoEspSnt();
      this.escolheOutraIgreja();
      this.escolheCargoMinisterial();
      this.escolheCursoTeo();
  }

  preparaFormulario() {
    this.preencheEstados();
    this.membroSendoEditado = JSON.parse(sessionStorage.getItem('membroAEditar')) as ModeloMembro;
    this.membroIdBackup = this.membroSendoEditado.id;
    if (this.membroSendoEditado) {
      this.membroSendoEditado.data_nasc = new Date(this.membroSendoEditado.data_nasc);
      if (this.membroSendoEditado.data_casamento) {
        this.membroSendoEditado.data_casamento = new Date(this.membroSendoEditado.data_casamento);
      }
      if (this.membroSendoEditado.data_batismo) {
        this.membroSendoEditado.data_batismo = new Date(this.membroSendoEditado.data_batismo);
      }
      if (this.membroSendoEditado.data_btsm_espsnt) {
        this.membroSendoEditado.data_btsm_espsnt = new Date(this.membroSendoEditado.data_btsm_espsnt);
      }
      this.membroSendoEditado.data_entrada = new Date(this.membroSendoEditado.data_entrada);
      if (this.membroSendoEditado.data_consagracao) {
        this.membroSendoEditado.data_consagracao = new Date(this.membroSendoEditado.data_consagracao);
      }
      try {
        this.preencheCidades(this.estados.find(e => e.sigla === this.membroSendoEditado.estado).id.toString());
      } catch (e) {}
      this.formMembro.patchValue(this.membroSendoEditado);
      sessionStorage.removeItem('membroAEditar');
    }
  }

  escolheEstado() {
    if (this.formMembro.get('cidade').disabled) {
      this.formMembro.get('cidade').enable();
    }
    this.preencheCidades(this.estadoSelecionado.id.toString());

  }

  preencheEstados() {
    this.localidadeApi.getEstados()
      .subscribe(
        resultado => {
          this.estados = resultado as ModeloEstado[];
          this.estados.forEach(estado => {
              estado.value = estado.sigla;
            }
          );
          this.estados.sort(this.compararNome);
          this.estados.unshift({id: null, nome: null, sigla: null, value: null});
        },
        erro => {
          this.mostraErro(erro);
        }
      );
  }

  preencheCidades(uf: string) {
    this.localidadeApi.getCidades(uf)
      .then(
        resultado => {
          this.cidades = resultado as ModeloCidade[];
          this.cidades.forEach(cidade => {
            cidade.value = cidade.nome;
          });
          this.cidades.sort(this.compararNome);
          this.cidades.unshift({id: null, nome: null, uf: null, value: null});
        },
        erro => {
          this.mostraErro(erro);
        }
      );
  }

  compararNome( a, b ) {
    if ( a.nome < b.nome ) {
      return -1;
    } else {
      return 1;
    }
    return 0;
  }

  onSubmit() {
    this.confirmationService.confirm({
      header: 'Atenção!',
      message: 'Você está prestes a editar as informações de um membro, deseja continuar?',
      acceptLabel: 'Sim',
      rejectLabel: 'Não',
      accept: () => {
        this.carregando = true;
        if (this.formMembro.valid) {
          this.membroSendoEditado = this.formMembro.value;
          this.membroSendoEditado.id = this.membroIdBackup;
          this.membroSendoEditado.data_nasc = this.formataData(this.membroSendoEditado.data_nasc);
          this.membroSendoEditado.estado = this.formMembro.get('estado').value.value;
          this.membroSendoEditado.cidade = this.formMembro.get('cidade').value.value;
          this.admiApi.updateMembro(this.membroSendoEditado).subscribe(
            resultado => {
              this.carregando = false;
              this.mostraMsg('Informações salvas com sucesso!', 'Sucesso!');
            },
            erro => {
              if (erro === 'VALOR_INVALIDO') {
                this.carregando = false;
                this.mostraErro('Há algum valor inválido. Por favor, preencha os campos corretamente');
              }
              this.carregando = false;
              this.mostraErro('Houve um erro, tente novamente');
            }
          );
        } else {
          this.carregando = false;
          this.mostraErro('Preencha todos os campos corretamente');
        }
      }
    });
  }

  pesquisaCep() {
    this.localidadeApi.getEndereco(this.formMembro.get('cep').value.replace('-', '')).subscribe(
      async resultado => {
        if (resultado.erro !== true) {
          this.modeloEndereco = {
            cep: resultado.cep,
            endereco: resultado.logradouro,
            complemento: resultado.complemento,
            estado: this.estados.find(e => e.sigla === resultado.uf),
            bairro: resultado.bairro
          };
          this.formMembro.get('cidade').enable();
          await this.localidadeApi.getCidades(this.modeloEndereco.estado.id).then(
            result => {
              this.cidades = result as ModeloCidade[];
              this.cidades.forEach(cidade => {
                cidade.value = cidade.nome;
              });
              this.cidades.sort(this.compararNome);
              this.cidades.unshift({id: null, nome: null, uf: null, value: null});
              this.modeloEndereco.cidade =  this.cidades.find(c => c.nome === resultado.localidade);
            }
          )
          .catch(
            error => {
              this.mostraErro('CEP inválido');
            }
          );
          let complementoBackup = this.formMembro.get('complemento').value;
          if (complementoBackup != '') {
          }
          this.formMembro.patchValue(this.modeloEndereco);
          this.formMembro.get('complemento').patchValue(complementoBackup);
        } else {
          this.mostraErro('CEP inválido');
        }
      },
      erro => {
        this.mostraErro('CEP inválido');
      }
    );
  }
  desabilitaCampos() {
    this.formMembro.get('cidade').disable();
    this.formMembro.get('data_casamento').disable();
    this.formMembro.get('nome_conjuge').disable();
    this.formMembro.get('data_batismo').disable();
    this.formMembro.get('igreja_batismo').disable();
    this.formMembro.get('data_btsm_espsnt').disable();
    this.formMembro.get('nome_outra_igreja').disable();
    this.formMembro.get('data_consagracao').disable();
    this.formMembro.get('local_consagracao').disable();
    this.formMembro.get('nome_curso_teo').disable();
  }

  escolheEstadoCivil() {

    if (this.formMembro.get('estado_civil').value === 'CASADO') {
      this.formMembro.get('data_casamento').enable();
      this.formMembro.get('nome_conjuge').enable();
      this.labelDataCasamento.nativeElement.innerHTML = this.labelDataCasamento.nativeElement.innerHTML + '*';
      this.labelNomeConjuge.nativeElement.innerHTML = this.labelNomeConjuge.nativeElement.innerHTML + '*';
      this.formMembro.get('data_casamento').setValidators([Validators.required]);
      this.formMembro.get('data_casamento').updateValueAndValidity();
      this.formMembro.get('nome_conjuge').setValidators([Validators.required, Validators.pattern('^[A-Za-zñÑáéíóúÁÉÍÓÚâêîôûÂÊÎÔÛãõÃÔçÇ ]+$')]);
      this.formMembro.get('nome_conjuge').updateValueAndValidity();
    } else {
      this.formMembro.get('data_casamento').disable();
      this.formMembro.get('nome_conjuge').disable();
      this.labelDataCasamento.nativeElement.innerHTML = this.labelDataCasamento.nativeElement.innerHTML.replace('*', '');
      this.labelNomeConjuge.nativeElement.innerHTML = this.labelNomeConjuge.nativeElement.innerHTML.replace('*', '');
      this.formMembro.get('data_casamento').clearValidators();
      this.formMembro.get('nome_conjuge').clearValidators();
    }
  }
  escolheBatizado() {
    if (this.formMembro.get('batizado').value === 'SIM') {
      this.formMembro.get('data_batismo').enable();
      this.formMembro.get('igreja_batismo').enable();
      this.labelDataBatismo.nativeElement.innerHTML = this.labelDataBatismo.nativeElement.innerHTML + '*';
      this.labelIgrejaBatismo.nativeElement.innerHTML = this.labelIgrejaBatismo.nativeElement.innerHTML + '*';
      this.formMembro.get('data_batismo').setValidators([Validators.required]);
      this.formMembro.get('data_batismo').updateValueAndValidity();
      this.formMembro.get('igreja_batismo').setValidators([Validators.required]);
      this.formMembro.get('igreja_batismo').updateValueAndValidity();
    } else {
      this.formMembro.get('data_batismo').disable();
      this.formMembro.get('igreja_batismo').disable();
      this.labelDataBatismo.nativeElement.innerHTML = this.labelDataBatismo.nativeElement.innerHTML.replace('*', '');
      this.labelIgrejaBatismo.nativeElement.innerHTML = this.labelIgrejaBatismo.nativeElement.innerHTML.replace('*', '');
      this.formMembro.get('data_batismo').clearValidators();
      this.formMembro.get('igreja_batismo').clearValidators();
    }
  }
  escolheBatizadoEspSnt() {
    if (this.formMembro.get('batizado_esp_santo').value === 'SIM') {
      this.formMembro.get('data_btsm_espsnt').enable();
      this.labelDataBatismoEspSnt.nativeElement.innerHTML = this.labelDataBatismoEspSnt.nativeElement.innerHTML + '*';
      this.formMembro.get('data_btsm_espsnt').setValidators([Validators.required]);
      this.formMembro.get('data_btsm_espsnt').updateValueAndValidity();
    } else {
      this.formMembro.get('data_btsm_espsnt').disable();
      this.labelDataBatismoEspSnt.nativeElement.innerHTML = this.labelDataBatismoEspSnt.nativeElement.innerHTML.replace('*', '');
      this.formMembro.get('data_btsm_espsnt').clearValidators();
    }
  }
  escolheOutraIgreja() {
    if (this.formMembro.get('vindo_outra_igreja').value === 'SIM') {
      this.formMembro.get('nome_outra_igreja').enable();
      this.labelNomeOutraIgreja.nativeElement.innerHTML = this.labelNomeOutraIgreja.nativeElement.innerHTML + '*';
      this.formMembro.get('nome_outra_igreja').setValidators([Validators.required]);
      this.formMembro.get('nome_outra_igreja').updateValueAndValidity();
    } else {
      this.formMembro.get('nome_outra_igreja').disable();
      this.labelNomeOutraIgreja.nativeElement.innerHTML = this.labelNomeOutraIgreja.nativeElement.innerHTML.replace('*', '');
      this.formMembro.get('nome_outra_igreja').clearValidators();
    }
  }
  escolheCargoMinisterial() {
    if (this.formMembro.get('cargo_ministerial').value !== 'MEMBRO') {
      this.formMembro.get('data_consagracao').enable();
      this.formMembro.get('local_consagracao').enable();
      this.labelDataConsagracao.nativeElement.innerHTML = this.labelDataConsagracao.nativeElement.innerHTML + '*';
      this.labelLocalConsagracao.nativeElement.innerHTML = this.labelLocalConsagracao.nativeElement.innerHTML + '*';
      this.formMembro.get('data_consagracao').setValidators([Validators.required]);
      this.formMembro.get('data_consagracao').updateValueAndValidity();
      this.formMembro.get('local_consagracao').setValidators([Validators.required]);
      this.formMembro.get('local_consagracao').updateValueAndValidity();
    } else {
      this.formMembro.get('data_consagracao').disable();
      this.formMembro.get('local_consagracao').disable();
      this.labelDataConsagracao.nativeElement.innerHTML = this.labelDataConsagracao.nativeElement.innerHTML.replace('*', '');
      this.labelLocalConsagracao.nativeElement.innerHTML = this.labelLocalConsagracao.nativeElement.innerHTML.replace('*', '');
      this.formMembro.get('data_consagracao').clearValidators();
      this.formMembro.get('local_consagracao').clearValidators();
    }
  }
  escolheCursoTeo() {
    if (this.formMembro.get('curso_teo').value === 'SIM') {
      this.formMembro.get('nome_curso_teo').enable();
      this.labelNomeCursoTeo.nativeElement.innerHTML = this.labelNomeCursoTeo.nativeElement.innerHTML + '*';
      this.formMembro.get('nome_curso_teo').setValidators([Validators.required]);
      this.formMembro.get('nome_curso_teo').updateValueAndValidity();

    } else {
      this.formMembro.get('nome_curso_teo').disable();
      this.labelNomeCursoTeo.nativeElement.innerHTML = this.labelNomeCursoTeo.nativeElement.innerHTML.replace('*', '');
      this.formMembro.get('nome_curso_teo').clearValidators();
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
    this.formMembro.reset();
  }

  voltarLista() {
    this.router.navigate(['/lista_membro']);
  }

  formataData(data): Date {
    data.setMinutes(data.getMinutes() + data.getTimezoneOffset());
    return data;
  }
}
