import { Component,  OnInit } from '@angular/core';
import { ModeloMembro } from 'src/app/models/modelo-membro';
import { AdmiApiService } from 'src/app/services/admi-api.service';
import { SelectItem } from 'primeng/api';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-aniversariante-relatorio-page',
  templateUrl: './aniversariante-relatorio-page.component.html',
  styleUrls: ['./aniversariante-relatorio-page.component.css']
})
export class AniversarianteRelatorioPageComponent implements OnInit {

  aniversariantes: ModeloMembro[] = [];

  mesSelecionado: number;

  meses: SelectItem[];

  colunas = [
    {campo: 'nome', cabecalho: 'Nome'},
    {campo: 'data_nasc', cabecalho: 'Data de Nascimento'},
  ];
  cabecalhoPopUp: string;
  msgPopUp: string;
  dialogoPopUp: boolean;

  carregando: boolean;

  constructor(
    private admiApi: AdmiApiService,
    private datePipe: DatePipe,
    private router: Router
  ) { }

  ngOnInit() {
    this.meses = [];
    this.meses = [
      {label: null, value: null},
      {label: 'Janeiro', value: '01'},
      {label: 'Fevereiro', value: '02'},
      {label: 'Março', value: '03'},
      {label: 'Abril', value: '04'},
      {label: 'Maio', value: '05'},
      {label: 'Junho', value: '06'},
      {label: 'Julho', value: '07'},
      {label: 'Agosto', value: '08'},
      {label: 'Setembro', value: '09'},
      {label: 'Outubro', value: '10'},
      {label: 'Novembro', value: '11'},
      {label: 'Dezembro', value: '12'}
    ];
  }

  getAniversariantes() {
    this.carregando = true;
    this.aniversariantes = null;
    let ani: ModeloMembro[] = [];
    let membros: ModeloMembro[] = [];
    this.admiApi.getMembros().subscribe(
      resultado => {
        membros = resultado as ModeloMembro[];
        membros.forEach(e => {
          let mesNum: number;
          e.data_nasc = new Date(e.data_nasc);
          if (this.mesSelecionado == (e.data_nasc.getMonth() + 1)) {
            e.data_nasc = this.datePipe.transform(e.data_nasc as Date, 'dd/MM/yyyy');
            ani.push(e);
          }
        });
        this.aniversariantes = ani;
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
  voltaHome() {
    this.router.navigate(['/home']);
  }

  mostraErro(erro: string) {
    this.cabecalhoPopUp = 'Erro';
    this.msgPopUp = erro;
    this.dialogoPopUp = true;
  }
}
