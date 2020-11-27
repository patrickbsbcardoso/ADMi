package br.com.admi.entidades.enums;

public enum CargoMinisterial {
	
	COOPERADOR("Cooperador(a)"),
	OBREIRO("Obreiro(a)"),
	DIACONO("Di�cono(a)"),
	PRESBITERO("Presb�tero"),
	EVANGELISTA("Evagelista"),
	MISSIONARIO("Mission�rio(a)"),
	PASTOR("Pastor(a)");
	
	private String cargoMinisterial;
	
	private CargoMinisterial(String cargoMinisterial) {
		this.cargoMinisterial = cargoMinisterial;
	}
}
