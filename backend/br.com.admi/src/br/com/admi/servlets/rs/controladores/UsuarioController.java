package br.com.admi.servlets.rs.controladores;

import java.util.List;

import javax.annotation.security.PermitAll;
import javax.annotation.security.RolesAllowed;
import javax.persistence.NoResultException;
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
import br.com.admi.entidades.modelos.Usuario;
import br.com.admi.repositorios.implementacoes.MembroRepository;
import br.com.admi.repositorios.implementacoes.UsuarioRepository;
import br.com.admi.repositorios.interfaces.BuscaUsuarioRepository;
import br.com.admi.repositorios.interfaces.CrudRepository;

@Path("/usuarios")
public class UsuarioController {
	
	@RolesAllowed("ADMIN")
	@GET
	@Produces({ MediaType.APPLICATION_JSON })
	public Response buscaTodos() {
		try {
			CrudRepository<Usuario, Integer> usuarioRep = new UsuarioRepository();
			List<Usuario> usuarios = usuarioRep.buscaTodos();
			if (!usuarios.isEmpty()) {
				return Response.ok(usuarios).build();
			} else {
				return Response.serverError().entity("NAO_HA_USUARIOS").build();
			}
		} catch (Exception e) {
			System.out.println(e.getMessage());
			return Response.serverError().entity("ERRO_GENERICO").build();
		}	
	}
	
	@PermitAll
	@POST
	@Path("/usuario")
	@Consumes({ MediaType.APPLICATION_JSON })
	@Produces({ MediaType.APPLICATION_JSON })
	public Response buscaUsuario(Usuario usuario) {
		BuscaUsuarioRepository<Usuario, Integer> usuarioRep = new UsuarioRepository();
		try{
			Usuario resultUsuario = usuarioRep.buscaUsuario(usuario);
			if (resultUsuario != null) {
				return Response.ok(resultUsuario).build();
			}
		} catch (Exception e) {
			if (e.getMessage() == "No entity found for query") {
				System.out.println(e.getMessage());
				return Response.status(401).entity("USUARIO_NAO_ENCONTRADO").build();	
			}
			System.out.println(e.getMessage());
			return Response.serverError().entity("ERRO_GENERICO").build();
		}		
		return Response.serverError().entity("ERRO_GENERICO").build();
	}
	
	@RolesAllowed("ADMIN")
	@POST
	@Consumes({ MediaType.APPLICATION_JSON })
	@Produces({ MediaType.APPLICATION_JSON })
	public Response insere(Usuario usuario) {
		try {
			BuscaUsuarioRepository<Usuario, Integer> usuarioRep = new UsuarioRepository();
			if(usuarioRep.insere(usuario) == null) {
				return Response.serverError().build();
			} else {
				return Response.ok().build();
			}
		} catch (Exception e) {
			if (e.getMessage().trim().startsWith("Duplicate entry")) {
				System.out.println(e.getMessage());
				return Response.status(400).entity("USUARIO_DUPLICADO").build();
			} else {  
				System.out.println(e.getMessage());
				return Response.serverError().entity("ERRO_GENERICO").build();
			}
		} 
	}
	
	@RolesAllowed("ADMIN")
	@PUT
	@Consumes({ MediaType.APPLICATION_JSON })
	@Produces({ MediaType.APPLICATION_JSON })
	public Response atualiza(Usuario usuario) {
		try {
			BuscaUsuarioRepository<Usuario, Integer> usuarioRep = new UsuarioRepository();
			if(usuarioRep.atualiza(usuario) == null) {
				return Response.serverError().build();
			} else {
				return Response.ok(usuario, MediaType.APPLICATION_JSON).build();
			}
		} catch (Exception e) {
			if (e.getMessage().trim().startsWith("Duplicate entry")) {
				System.out.println(e.getMessage());
				return Response.status(400).entity("USUARIO_DUPLICADO").build();
			} else {  
				System.out.println(e.getMessage());
				return Response.serverError().entity("ERRO_GENERICO").build();
			}
		}
	}
	
	@RolesAllowed("ADMIN")
	@DELETE
	@Consumes({ MediaType.APPLICATION_JSON })
	@Produces({ MediaType.APPLICATION_JSON })
	@Path("{id}")
	public Response deleta(@PathParam("id")Integer id) {
		try {
			BuscaUsuarioRepository<Usuario, Integer> usuarioRep = new UsuarioRepository();
			if(usuarioRep.deleta(id)) {
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
