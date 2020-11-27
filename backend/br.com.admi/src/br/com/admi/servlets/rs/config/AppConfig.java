package br.com.admi.servlets.rs.config;

import org.glassfish.jersey.server.ResourceConfig;

import br.com.admi.servlets.rs.controladores.MembroController;
import br.com.admi.servlets.rs.controladores.UsuarioController;
import br.com.admi.servlets.rs.filters.FiltroAutenticacao;

public class AppConfig extends ResourceConfig{
	
	public AppConfig() {
		register(FiltroAutenticacao.class);
		register(MembroController.class);
		register(UsuarioController.class);
	}
}
