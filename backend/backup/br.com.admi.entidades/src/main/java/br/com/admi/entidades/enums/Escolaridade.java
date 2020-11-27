package br.com.admi.entidades.enums;

public enum Escolaridade {
	
	ANALFABETO("Analfabeto"),
	EF_INCOMPLETO("Ensino Fundamental Incompleto"),
	EF_COMPLETO("Ensino Fundamental Completo"),
	EM_INCOMPLETO("Ensino Médio Incompleto"),
	EM_COMPLETO("Ensino Médio Completo"),
	ES_COMPLETO("Ensino Superior Completo"),
	POS_GRADUADO("Pós-Graduação"),
	MESTRADO("Mestrado"),
	DOUTORADO("Doutorado"),
	POS_DOUTORADO("Pós-Doutorado");
		
	
	
	private String escolaridade;
	
	Escolaridade(String escolaridade){
		this.escolaridade = escolaridade;
	}
}
