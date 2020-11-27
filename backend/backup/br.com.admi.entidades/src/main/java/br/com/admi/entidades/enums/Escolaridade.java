package br.com.admi.entidades.enums;

public enum Escolaridade {
	
	ANALFABETO("Analfabeto"),
	EF_INCOMPLETO("Ensino Fundamental Incompleto"),
	EF_COMPLETO("Ensino Fundamental Completo"),
	EM_INCOMPLETO("Ensino M�dio Incompleto"),
	EM_COMPLETO("Ensino M�dio Completo"),
	ES_COMPLETO("Ensino Superior Completo"),
	POS_GRADUADO("P�s-Gradua��o"),
	MESTRADO("Mestrado"),
	DOUTORADO("Doutorado"),
	POS_DOUTORADO("P�s-Doutorado");
		
	
	
	private String escolaridade;
	
	Escolaridade(String escolaridade){
		this.escolaridade = escolaridade;
	}
}
