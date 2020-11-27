package br.com.admi.servlets.rs.dtos;

import br.com.admi.entidades.enums.CargoMinisterial;
import br.com.admi.entidades.enums.Escolaridade;
import br.com.admi.entidades.enums.EstadoCivil;
import br.com.admi.entidades.enums.MotivoEntrada;
import br.com.admi.entidades.enums.Sexo;
import br.com.admi.entidades.enums.SimNao;
import br.com.admi.entidades.modelos.Membro;

public class MembroDTO {
	
	//ID
	private int id;
	
	//Informa��es Pessoais
	private String nome;
    private Sexo sexo;
    private String data_nasc;
    private String cpf;
    private String rg;
    private String naturalidade;
    private String nacionalidade;
    
    //Estado Civil
    private EstadoCivil estado_civil;
    private String data_casamento;
    private String nome_conjuge;
    
    //Endere�o
    private String endereco;
    private int num_casa;
    private String complemento;
    private String bairro;
    private String cidade;
    private String estado;
    private String cep;
    
    //Contato
    private String tel_residencial;
    private String tel_celular;
    private String email;
    
    //Escolaridade
    private Escolaridade escolaridade;
    
    //Profiss�o
    private String profissao;
    
    //Parentesco
    private String nome_pai;
    private String nome_mae;
    
    //Batismo
    private SimNao batizado;
    private String data_batismo;
    private SimNao batizado_esp_santo;
    private String data_btsm_espsnt;
    private String igreja_batismo;
    
    //Entrada na IADMIRREFA
    private String data_entrada;
    private MotivoEntrada motivo_entrada;
    private SimNao ja_foi_membro;
    private SimNao vindo_outra_igreja;
    private String nome_outra_igreja;
    private SimNao carta_mudanca;
    
    //Curso Teol�gico
    private SimNao curso_teo;
    private String nome_curso_teo;
    
    //Cargo Eclesi�stico
    private CargoMinisterial cargo_ministerial;
    private String data_consagracao;
    private String funcao_eclesiastica;
    private String local_consagracao;

    
    public Membro transformaParaMembro() {
    	return new Membro(nome, sexo, data_nasc, cpf, rg, naturalidade,
    			nacionalidade, estado_civil, data_casamento, nome_conjuge, endereco,
    			num_casa, complemento, bairro, cidade, estado, cep,
    			tel_residencial, tel_celular, email, escolaridade, profissao,
    			nome_pai, nome_mae, batizado, data_batismo, batizado_esp_santo,
    			data_btsm_espsnt, igreja_batismo, data_entrada, motivo_entrada,
    			ja_foi_membro, vindo_outra_igreja, nome_outra_igreja, carta_mudanca,
    			curso_teo, nome_curso_teo, cargo_ministerial, data_consagracao,
    			funcao_eclesiastica, local_consagracao);
    }
    
	public int getId() {
		return id;
	}
	
	public void setId(int id) {
		this.id = id;
	}

	public String getNome() {
		return nome;
	}

	public void setNome(String nome) {
		this.nome = nome;
	}

	public Sexo getSexo() {
		return sexo;
	}

	public void setSexo(Sexo sexo) {
		this.sexo = sexo;
	}

	public String getData_nasc() {
		return data_nasc;
	}

	public void setData_nasc(String data_nasc) {
		this.data_nasc = data_nasc;
	}

	public String getCpf() {
		return cpf;
	}

	public void setCpf(String cpf) {
		this.cpf = cpf;
	}

	public String getRg() {
		return rg;
	}

	public void setRg(String rg) {
		this.rg = rg;
	}

	public String getNaturalidade() {
		return naturalidade;
	}

	public void setNaturalidade(String naturalidade) {
		this.naturalidade = naturalidade;
	}

	public String getNacionalidade() {
		return nacionalidade;
	}

	public void setNacionalidade(String nacionalidade) {
		this.nacionalidade = nacionalidade;
	}

	public EstadoCivil getEstado_civil() {
		return estado_civil;
	}

	public void setEstado_civil(EstadoCivil estado_civil) {
		this.estado_civil = estado_civil;
	}

	public String getData_casamento() {
		return data_casamento;
	}

	public void setData_casamento(String data_casamento) {
		this.data_casamento = data_casamento;
	}

	public String getNome_conjuge() {
		return nome_conjuge;
	}

	public void setNome_conjuge(String nome_conjuge) {
		this.nome_conjuge = nome_conjuge;
	}

	public String getEndereco() {
		return endereco;
	}

	public void setEndereco(String endereco) {
		this.endereco = endereco;
	}

	public int getNum_casa() {
		return num_casa;
	}

	public void setNum_casa(int num_casa) {
		this.num_casa = num_casa;
	}

	public String getComplemento() {
		return complemento;
	}

	public void setComplemento(String complemento) {
		this.complemento = complemento;
	}

	public String getBairro() {
		return bairro;
	}

	public void setBairro(String bairro) {
		this.bairro = bairro;
	}

	public String getCidade() {
		return cidade;
	}

	public void setCidade(String cidade) {
		this.cidade = cidade;
	}

	public String getEstado() {
		return estado;
	}

	public void setEstado(String estado) {
		this.estado = estado;
	}

	public String getCep() {
		return cep;
	}

	public void setCep(String cep) {
		this.cep = cep;
	}

	public String getTel_residencial() {
		return tel_residencial;
	}

	public void setTel_residencial(String tel_residencial) {
		this.tel_residencial = tel_residencial;
	}

	public String getTel_celular() {
		return tel_celular;
	}

	public void setTel_celular(String tel_celular) {
		this.tel_celular = tel_celular;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public Escolaridade getEscolaridade() {
		return escolaridade;
	}

	public void setEscolaridade(Escolaridade escolaridade) {
		this.escolaridade = escolaridade;
	}

	public String getProfissao() {
		return profissao;
	}

	public void setProfissao(String profissao) {
		this.profissao = profissao;
	}

	public String getNome_pai() {
		return nome_pai;
	}

	public void setNome_pai(String nome_pai) {
		this.nome_pai = nome_pai;
	}

	public String getNome_mae() {
		return nome_mae;
	}

	public void setNome_mae(String nome_mae) {
		this.nome_mae = nome_mae;
	}

	public SimNao getBatizado() {
		return batizado;
	}

	public void setBatizado(SimNao batizado) {
		this.batizado = batizado;
	}

	public String getData_batismo() {
		return data_batismo;
	}

	public void setData_batismo(String data_batismo) {
		this.data_batismo = data_batismo;
	}

	public SimNao getBatizado_esp_santo() {
		return batizado_esp_santo;
	}

	public void setBatizado_esp_santo(SimNao batizado_esp_santo) {
		this.batizado_esp_santo = batizado_esp_santo;
	}

	public String getData_btsm_espsnt() {
		return data_btsm_espsnt;
	}

	public void setData_btsm_espsnt(String data_btsm_espsnt) {
		this.data_btsm_espsnt = data_btsm_espsnt;
	}

	public String getIgreja_batismo() {
		return igreja_batismo;
	}

	public void setIgreja_batismo(String igreja_batismo) {
		this.igreja_batismo = igreja_batismo;
	}

	public String getData_entrada() {
		return data_entrada;
	}

	public void setData_entrada(String data_entrada) {
		this.data_entrada = data_entrada;
	}

	public MotivoEntrada getMotivo_entrada() {
		return motivo_entrada;
	}

	public void setMotivo_entrada(MotivoEntrada motivo_entrada) {
		this.motivo_entrada = motivo_entrada;
	}

	public SimNao getJa_foi_membro() {
		return ja_foi_membro;
	}

	public void setJa_foi_membro(SimNao ja_foi_membro) {
		this.ja_foi_membro = ja_foi_membro;
	}

	public SimNao getVindo_outra_igreja() {
		return vindo_outra_igreja;
	}

	public void setVindo_outra_igreja(SimNao vindo_outra_igreja) {
		this.vindo_outra_igreja = vindo_outra_igreja;
	}

	public String getNome_outra_igreja() {
		return nome_outra_igreja;
	}

	public void setNome_outra_igreja(String nome_outra_igreja) {
		this.nome_outra_igreja = nome_outra_igreja;
	}

	public SimNao getCarta_mudanca() {
		return carta_mudanca;
	}

	public void setCarta_mudanca(SimNao carta_mudanca) {
		this.carta_mudanca = carta_mudanca;
	}

	public SimNao getCurso_teo() {
		return curso_teo;
	}

	public void setCurso_teo(SimNao curso_teo) {
		this.curso_teo = curso_teo;
	}

	public String getNome_curso_teo() {
		return nome_curso_teo;
	}

	public void setNome_curso_teo(String nome_curso_teo) {
		this.nome_curso_teo = nome_curso_teo;
	}

	public CargoMinisterial getCargo_ministerial() {
		return cargo_ministerial;
	}

	public void setCargo_ministerial(CargoMinisterial cargo_ministerial) {
		this.cargo_ministerial = cargo_ministerial;
	}

	public String getData_consagracao() {
		return data_consagracao;
	}

	public void setData_consagracao(String data_consagracao) {
		this.data_consagracao = data_consagracao;
	}

	public String getFuncao_eclesiastica() {
		return funcao_eclesiastica;
	}

	public void setFuncao_eclesiastica(String funcao_eclesiastica) {
		this.funcao_eclesiastica = funcao_eclesiastica;
	}

	public String getLocal_consagracao() {
		return local_consagracao;
	}

	public void setLocal_consagracao(String local_consagracao) {
		this.local_consagracao = local_consagracao;
	}
    
    
}
