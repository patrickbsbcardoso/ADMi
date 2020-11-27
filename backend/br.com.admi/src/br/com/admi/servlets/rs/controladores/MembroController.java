package br.com.admi.servlets.rs.controladores;

import java.util.List;

import javax.annotation.security.PermitAll;
import javax.annotation.security.RolesAllowed;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import br.com.admi.entidades.modelos.Membro;
import br.com.admi.repositorios.implementacoes.MembroRepository;
import br.com.admi.repositorios.interfaces.CrudRepository;

@Path("/membros")
public class MembroController {
	
	@RolesAllowed({"ADMIN", "USUARIO"})
	@GET
	@Consumes({ MediaType.APPLICATION_JSON })
	@Produces({ MediaType.APPLICATION_JSON })
	public Response buscaTodos() {
		try {
			CrudRepository<Membro, Integer> membroRep = new MembroRepository();
			List<Membro> membros = membroRep.buscaTodos();
			if (!membros.isEmpty()) {
				return Response.ok(membros).build();
			} else {
				return Response.serverError().entity("NAO_HA_MEMBROS").build();
			}
		} catch (Exception e) {
			System.out.println(e.getMessage());
			return Response.serverError().entity("ERRO_GENERICO").build();
		}	
	}
	
	@RolesAllowed({"ADMIN", "USUARIO"})
	@GET
	@Path("{id}")
	@Produces({ MediaType.APPLICATION_JSON })
	public Response buscaPorId(@PathParam("id")Integer id) {
		try {
			CrudRepository<Membro, Integer> membroRep = new MembroRepository();
			Membro membro = membroRep.buscaPorId(id);
			return Response.ok(membro).build();
		} catch (Exception e) {
			if (e.getMessage() == "No entity found for query") {
				System.out.println(e.getMessage());
				return Response.status(500).entity("MEMBRO_NAO_ENCONTRADO").build();	
			}
			System.out.println(e.getMessage());
			return Response.serverError().entity("ERRO_GENERICO").build();
		}		
	}
	
	@RolesAllowed({"ADMIN", "USUARIO"})
	@POST
	@Consumes({ MediaType.APPLICATION_JSON })
	@Produces({ MediaType.APPLICATION_JSON })
	public Response insere(Membro membro) {
		try {
			CrudRepository<Membro, Integer> membroRep = new MembroRepository();
			if(membroRep.insere(membro) == null) {
				return Response.serverError().entity("ERRO_GENERICO").build();
			} else {
				return Response.ok().build();
			}
		} catch (IllegalArgumentException iae) {
			System.out.println(iae.getMessage());
			return Response.status(400).entity("VALOR_INVALIDO").build();
		} catch (Exception e) {
			System.out.println(e.getMessage());
			return Response.serverError().entity("ERRO_GENERICO").build();
		}
	}
	
	@RolesAllowed({"ADMIN", "USUARIO"})
	@PUT
	@Consumes({ MediaType.APPLICATION_JSON })
	@Produces({ MediaType.APPLICATION_JSON })
	public Response atualiza(Membro membro) {
		try {
			CrudRepository<Membro, Integer> membroRep = new MembroRepository();
			if(membroRep.atualiza(membro) == null) {
				return Response.serverError().entity("ERRO_GENERICO").build();
			} else {
				return Response.ok(membro, MediaType.APPLICATION_JSON).build();
			}
		} catch (Exception e) {
			System.out.println(e.getMessage());
			return Response.serverError().entity("ERRO_GENERICO").build();
		}
	}
	

	@RolesAllowed({"ADMIN", "USUARIO"})
	@DELETE
	@Produces({ MediaType.APPLICATION_JSON })
	@Path("{id}")
	public Response deleta(@PathParam("id")Integer id) {
		try {
			CrudRepository<Membro, Integer> membroRep = new MembroRepository();
			if(membroRep.deleta(id)) {
				return Response.ok().build();
			} else {
				return Response.serverError().entity("ERRO_GENERICO").build();
			}
		} catch (Exception e) {
			System.out.println(e.getMessage());
			return Response.serverError().entity("ERRO_GENERICO").build();
		}
	}
	
}
