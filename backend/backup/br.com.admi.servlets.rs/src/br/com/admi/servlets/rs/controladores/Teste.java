package br.com.admi.servlets.rs.controladores;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import br.com.admi.servlets.rs.dtos.TesteDTO;

@Path("/teste")
public class Teste {
	
	@GET
	@Produces({ MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML })
	public Response testar() {
		TesteDTO testedto = new TesteDTO();
		testedto.setTexto("Funciona HAHAHAHAHAHAH!");
		return Response.status(200).entity(testedto).build();
	}
}
