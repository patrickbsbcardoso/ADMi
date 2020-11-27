import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ModeloMembro } from 'src/app/models/modelo-membro';
import { AdmiApiService } from '../../services/admi-api.service';
import { Router } from '@angular/router';
import { ConfirmationService, SelectItem } from 'primeng/api';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-lista-membro-page',
  templateUrl: './lista-membro-page.component.html',
  styleUrls: ['./lista-membro-page.component.css']
})
export class ListaMembroPageComponent implements OnInit {

  @ViewChild('tabela', {static: false}) tabela: ElementRef;

  membros: ModeloMembro[];
  colunas: any[];
  linhaSelecionada: ModeloMembro;
  habilitaBotao = true;
  cabecalhoPopUp: string;
  msgPopUp: string;
  dialogoPopUp: boolean;
  sexo: SelectItem[];
  simNao: SelectItem[];
  escolaridade: SelectItem[];
  estadoCivil: SelectItem[];
  motivoEntrada: SelectItem[];
  cargoMinisterial: SelectItem[];
  carregando: boolean;

  constructor(
    private admiApi: AdmiApiService,
    private router: Router,
    private confirmationService: ConfirmationService,
    private datePipe: DatePipe
  ) { }

  ngOnInit() {
    this.getMembros();
    this.colunas = [
      { campo: 'nome', cabecalho: 'Nome Completo'},
      { campo: 'data_nasc', cabecalho: 'Data de Nascimento'},
      { campo: 'cpf', cabecalho: 'CPF'},
      { campo: 'cargo_ministerial', cabecalho: 'Cargo Ministerial'},
      { campo: 'funcao_eclesiastica', cabecalho: 'Função Eclesiástica'},
    ];

    this.sexo = [
      {label: 'Masculino', value: 'MASCULINO'},
      {label: 'Feminino', value: 'FEMININO'}
    ];
    this.simNao = [
      {label: 'Sim', value: 'SIM'},
      {label: 'Não', value: 'NAO'}
    ];
    this.escolaridade = [
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
      {label: 'Solteiro', value: 'SOLTEIRO'},
      {label: 'Casado', value: 'CASADO'},
      {label: 'Viúvo', value: 'VIUVO'},
      {label: 'Separado Judicialmente', value: 'SEPARADO'},
      {label: 'Divorciado', value: 'DIVORCIADO'},
    ];
    this.motivoEntrada = [
      {label: 'Reconciliação', value: 'RECONCILIACAO'},
      {label: 'Carta de mudança', value: 'CARTA_MUDANCA'},
      {label: 'Outros', value: 'OUTRO'},
    ];
    this.cargoMinisterial = [
      {label: 'Membro', value: 'MEMBRO'},
      {label: 'Cooperador(a)', value: 'COOPERADOR'},
      {label: 'Obreiro(a)', value: 'OBREIRO'},
      {label: 'Diácono(iza)', value: 'DIACONO'},
      {label: 'Presbítero', value: 'PRESBITERO'},
      {label: 'Evangelista', value: 'EVANGELISTA'},
      {label: 'Missionário(a)', value: 'MISSIONARIO'},
      {label: 'Pastor(a)', value: 'PASTOR'},
    ];

  }

  getMembros() {
    this.carregando = true;
    this.admiApi.getMembros().subscribe(
      resultado => {
        this.membros = resultado;
        this.membros.forEach(membro => {
          if (membro.estado_civil) {
            membro.estado_civil = this.estadoCivil.find(x => x.value === membro.estado_civil).label;
          }
          if (membro.sexo) {
            membro.sexo = this.sexo.find(x => x.value === membro.sexo).label;
          }
          if (membro.escolaridade) {
            membro.escolaridade = this.escolaridade.find(x => x.value === membro.escolaridade).label;
          }
          if (membro.motivo_entrada) {
            membro.motivo_entrada = this.motivoEntrada.find(x => x.value === membro.motivo_entrada).label;
          }
          if (membro.cargo_ministerial) {
            membro.cargo_ministerial = this.cargoMinisterial.find(x => x.value === membro.cargo_ministerial).label;
          }
          if (membro.batizado) {
            membro.batizado = this.simNao.find(x => x.value === membro.batizado).label;
          }
          if (membro.batizado_esp_santo) {
            membro.batizado_esp_santo = this.simNao.find(x => x.value === membro.batizado_esp_santo).label;
          }
          if (membro.carta_mudanca) {
            membro.carta_mudanca = this.simNao.find(x => x.value === membro.carta_mudanca).label;
          }
          if (membro.vindo_outra_igreja) {
            membro.vindo_outra_igreja = this.simNao.find(x => x.value === membro.vindo_outra_igreja).label;
          }
          if (membro.ja_foi_membro) {
            membro.ja_foi_membro = this.simNao.find(x => x.value === membro.ja_foi_membro).label;
          }
          if (membro.curso_teo) {
            membro.curso_teo = this.simNao.find(x => x.value === membro.curso_teo).label;
          }

          if (membro.data_nasc) {
            membro.data_nasc = this.transformaData(membro.data_nasc);
          }
          if (membro.data_batismo) {
            membro.data_batismo = this.transformaData(membro.data_batismo);
          }
          if (membro.data_btsm_espsnt) {
            membro.data_btsm_espsnt = this.transformaData(membro.data_btsm_espsnt);
          }
          if (membro.data_casamento) {
            membro.data_casamento = this.transformaData(membro.data_casamento);
          }
          if (membro.data_consagracao) {
            membro.data_consagracao = this.transformaData(membro.data_consagracao);
          }
          if (membro.data_entrada) {
            membro.data_entrada = this.transformaData(membro.data_entrada);
          }
        });
        this.carregando = false;
      },
      erro => {
        if (erro.error === 'ERRO_GENERICO') {
          this.carregando = false;
          this.mostraErro('Houve um erro, tente recarregar a página');
        }
        if (erro.error === 'NAO_HA_MEMBROS') {
          this.carregando = false;
        }
      }
      );
    }

    excluiMembro() {
    this.confirmationService.confirm({
      header: 'Atenção!',
      message: 'Você está prestes a excluir um membro, essa operação não poderá ser revertida. Deseja continuar?',
      acceptLabel: 'Sim',
      rejectLabel: 'Não',
      accept: () => {
        this.carregando = true;
        this.admiApi.deleteMembro(this.linhaSelecionada).subscribe(
          resultado => {
            this.membros = null;
            this.getMembros();
            this.carregando = false;
            this.mostraMsg('Membro excluído com sucesso', 'Sucesso!');
          },
          erro => {
            this.carregando = false;
            this.mostraErro('Houve um erro, tente recarregar a página');
           }
        );
      }
    });
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

  voltaHome() {
    this.router.navigate(['/home']);
  }

  irCadastroMembro() {
    this.router.navigate(['/cadastra_membro']);
  }

  irEditaMembro() {
    let membro = this.linhaSelecionada;
    if (membro.estado_civil) {
      membro.estado_civil = this.estadoCivil.find(x => x.label === membro.estado_civil).value;
    }
    if (membro.sexo) {
      membro.sexo = this.sexo.find(x => x.label === membro.sexo).value;
    }
    if (membro.escolaridade) {
      membro.escolaridade = this.escolaridade.find(x => x.label === membro.escolaridade).value;
    }
    if (membro.motivo_entrada) {
      membro.motivo_entrada = this.motivoEntrada.find(x => x.label === membro.motivo_entrada).value;
    }
    if (membro.cargo_ministerial) {
      membro.cargo_ministerial = this.cargoMinisterial.find(x => x.label === membro.cargo_ministerial).value;
    }
    if (membro.batizado) {
      membro.batizado = this.simNao.find(x => x.label === membro.batizado).value;
    }
    if (membro.batizado_esp_santo) {
      membro.batizado_esp_santo = this.simNao.find(x => x.label === membro.batizado_esp_santo).value;
    }
    if (membro.carta_mudanca) {
      membro.carta_mudanca = this.simNao.find(x => x.label === membro.carta_mudanca).value;
    }
    if (membro.vindo_outra_igreja) {
      membro.vindo_outra_igreja = this.simNao.find(x => x.label === membro.vindo_outra_igreja).value;
    }
    if (membro.ja_foi_membro) {
      membro.ja_foi_membro = this.simNao.find(x => x.label === membro.ja_foi_membro).value;
    }
    if (membro.curso_teo) {
      membro.curso_teo = this.simNao.find(x => x.label === membro.curso_teo).value;
    }

    if (membro.data_nasc) {
      membro.data_nasc = this.formataData(membro.data_nasc);
    }
    if (membro.data_batismo) {
      membro.data_batismo = this.formataData(membro.data_batismo);
    }
    if (membro.data_btsm_espsnt) {
      membro.data_btsm_espsnt = this.formataData(membro.data_btsm_espsnt);
    }
    if (membro.data_casamento) {
      membro.data_casamento = this.formataData(membro.data_casamento);
    }
    if (membro.data_consagracao) {
      membro.data_consagracao = this.formataData(membro.data_consagracao);
    }
    if (membro.data_entrada) {
      membro.data_entrada = this.formataData(membro.data_entrada);
    }
    sessionStorage.setItem('membroAEditar', JSON.stringify(membro));
    this.router.navigate(['/edita_membro']);
  }

  mostraInfo() {
    sessionStorage.setItem('membroInfo', JSON.stringify(this.linhaSelecionada));
    this.router.navigate(['/info_membro']);
  }

  formataData(data): any {
    let dia = data.substr(0, 2);
    let mes = data.substr(3, 2);
    let ano = data.substr(6, 4);
    let dataFormatada = new Date(ano + '-' + mes + '-' + dia + 'Z');
    dataFormatada.setMinutes(dataFormatada.getMinutes() + dataFormatada.getTimezoneOffset());
    return dataFormatada;
  }
  transformaData(date): any {
    let data = new Date(date);
    data.setMinutes(data.getMinutes() + data.getTimezoneOffset())
    let dia = data.getDate().toString();
    let mes = (data.getMonth() + 1).toString();
    let ano = data.getFullYear().toString();
    if (Number(dia) < 10) {
      dia = '0' + dia;
    }
    if (Number(mes) < 10) {
      mes = '0' + mes;
    }

    return dia + '/' + mes + '/' + ano;
  }
}
