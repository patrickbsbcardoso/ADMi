package br.com.admi.entidades.enums;

public enum MotivoEntrada {
	
	RECONCILIACAO("Reconcilia��o"),
	CARTA_MUDANCA("Carta de Mudan�a"),
	OUTRO("Outro");
	
	private String motivoEntrada;
	
	MotivoEntrada(String motivoEntrada){
		this.motivoEntrada = motivoEntrada;
	}
}
