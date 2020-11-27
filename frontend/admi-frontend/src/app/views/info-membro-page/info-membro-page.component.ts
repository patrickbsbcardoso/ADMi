import { Component, OnInit } from '@angular/core';
import { ModeloMembro } from 'src/app/models/modelo-membro';
import { SelectItem } from 'primeng/api';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-info-membro-page',
  templateUrl: './info-membro-page.component.html',
  styleUrls: ['./info-membro-page.component.css']
})
export class InfoMembroPageComponent implements OnInit {

  membro: ModeloMembro = new ModeloMembro();
  infoMembro: any[];

  constructor(
    private datePipe: DatePipe,
    private router: Router
  ) { }

  ngOnInit() {

    this.membro = JSON.parse(sessionStorage.getItem('membroInfo'));
    sessionStorage.removeItem('membroInfo');

    this.infoMembro = [
      { label: 'Nome Completo', value: this.membro.nome },
      { label: 'Sexo', value: this.membro.sexo },
      { label: 'Data de Nascimento', value: this.membro.data_nasc },
      { label: 'RG', value: this.membro.rg },
      { label: 'CPF', value: this.membro.cpf },
      { label: 'Grau de Escolaridade', value: this.membro.escolaridade },
      { label: 'Profissão', value: this.membro.profissao },
      { label: 'E-mail', value: this.membro.email },
      { label: 'Telefone Residencial', value: this.membro.tel_residencial },
      { label: 'Telefone Celular', value: this.membro.tel_celular },
      { label: 'CEP', value: this.membro.cep },
      { label: 'Endereço', value: this.membro.endereco },
      { label: 'Número', value: this.membro.num_casa },
      { label: 'Complemento', value: this.membro.complemento },
      { label: 'Estado', value: this.membro.estado },
      { label: 'Cidade', value: this.membro.cidade },
      { label: 'Bairro', value: this.membro.bairro },
      { label: 'Naturalidade', value: this.membro.naturalidade },
      { label: 'Nacionalidade', value: this.membro.nacionalidade },
      { label: 'Estado Civil', value: this.membro.estado_civil },
      { label: 'Data do Casamento', value: this.membro.data_casamento },
      { label: 'Nome do Cônjuge', value: this.membro.nome_conjuge },
      { label: 'Nome do Pai', value: this.membro.nome_pai },
      { label: 'Nome da Mãe', value: this.membro.nome_mae },
      { label: 'Batizado', value: this.membro.batizado },
      { label: 'Data do Batismo', value: this.membro.data_batismo },
      { label: 'Igreja em que foi batizado', value: this.membro.igreja_batismo },
      { label: 'Batizado Esp. Santo', value: this.membro.batizado_esp_santo },
      { label: 'Data Batismo Esp. Santo', value: this.membro.data_btsm_espsnt },
      { label: 'Data de Entrada', value: this.membro.data_entrada },
      { label: 'Motivo da Entrada', value: this.membro.motivo_entrada },
      { label: 'Carta de Mudança', value: this.membro.carta_mudanca },
      { label: 'Vindo de outra Igreja', value: this.membro.vindo_outra_igreja },
      { label: 'Qual Igreja', value: this.membro.nome_outra_igreja },
      { label: 'Já foi membro do Ministério', value: this.membro.ja_foi_membro },
      { label: 'Cargo Ministerial', value: this.membro.cargo_ministerial },
      { label: 'Data da consagração', value: this.membro.data_consagracao },
      { label: 'Igreja/Local da consagração', value: this.membro.local_consagracao },
      { label: 'Função que exerce', value: this.membro.funcao_eclesiastica },
      { label: 'Curso Teológico', value: this.membro.curso_teo },
      { label: 'Qual Curso', value: this.membro.nome_curso_teo }
    ];
  }

  voltarLista() {
    this.router.navigate(['/lista_membro']);
  }

  exportPDF() {
    let colunas: any[] = ['', ''];
    let linhas = [];
    for (let i = 0; i < this.infoMembro.length; i++) {
      let temp = [this.infoMembro[i].label, this.infoMembro[i].value];
      linhas.push(temp);
    }
    import('jspdf').then(jsPDF => {
        import('jspdf-autotable').then(x => {
            const doc = new jsPDF.default(0, 0);
            doc.autoTable(colunas, linhas);
            doc.output('dataurlnewwindow');
        });
    });
}
}
