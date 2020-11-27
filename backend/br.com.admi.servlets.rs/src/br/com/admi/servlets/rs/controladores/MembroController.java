package br.com.admi.servlets.rs.controladores;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import br.com.admi.entidades.modelos.Membro;
import br.com.admi.repositorios.implementacoes.MembroRepository;

@Path("/membros")
public class MembroController {
	
	@GET
	@Produces({ MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML })
	public Response buscaTodos() {
		MembroRepository membroRepository = new MembroRepository();
		return Response.ok(membroRepository.buscaTodos()).build();
	}
	
	@GET
	@Path("{id}")
	@Produces({ MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML })
	public Response buscaPorId(@PathParam("id")Integer id) {
		MembroRepository membroRepository = new MembroRepository();
		Membro membro = membroRepository.buscaPorId(id);
		return Response.ok(membro).build();	
	}
	
	
	public Response insere() {
		return null;
	}
	
	public Response atualiza(Membro membro) {
		return null;
	}

	public Response deleta(Membro membro) {
		return null;
	}

	public Response deletaPorId(Integer id) {
		return null;
	}
	
	
}
