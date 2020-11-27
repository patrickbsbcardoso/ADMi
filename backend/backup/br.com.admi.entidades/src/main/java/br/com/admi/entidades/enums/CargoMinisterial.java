package br.com.admi.entidades.enums;

public enum CargoMinisterial {
	
	COOPERADOR("Cooperador(a)"),
	OBREIRO("Obreiro(a)"),
	DIACONO("Diácono(a)"),
	PRESBITERO("Presbítero"),
	EVANGELISTA("Evagelista"),
	MISSIONARIO("Missionário(a)"),
	PASTOR("Pastor(a)");
	
	private String cargoMinisterial;
	
	private CargoMinisterial(String cargoMinisterial) {
		this.cargoMinisterial = cargoMinisterial;
	}
}
