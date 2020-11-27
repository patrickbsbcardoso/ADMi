package br.com.admi.entidades.enums;

public enum MotivoEntrada {
	
	RECONCILIACAO("Reconciliação"),
	CARTA_MUDANCA("Carta de Mudança"),
	OUTRO("Outro");
	
	private String motivoEntrada;
	
	MotivoEntrada(String motivoEntrada){
		this.motivoEntrada = motivoEntrada;
	}
}
