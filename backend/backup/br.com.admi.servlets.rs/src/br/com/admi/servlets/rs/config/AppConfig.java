package br.com.admi.servlets.rs.config;

import org.glassfish.jersey.server.ResourceConfig;

import br.com.admi.servlets.rs.controladores.Teste;

public class AppConfig extends ResourceConfig{
	
	public AppConfig() {
		register(Teste.class);
	}
}
