package br.com.admi.entidades.enums;

public enum EstadoCivil {
	
	SOLTEIRO("Solteiro(a)"),
	CASADO("Casado(a)"),
	DIVORCIADO("Divorciado(a)"),
	VIUVO("Vi�vo(a)"),
	SEPARADO("Separado(a)");
	
	private String estadoCivil;
	
	EstadoCivil(String estadoCivil) {
		this.estadoCivil = estadoCivil;
	}
}
