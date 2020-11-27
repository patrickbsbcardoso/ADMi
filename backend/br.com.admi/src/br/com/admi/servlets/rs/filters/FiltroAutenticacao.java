package br.com.admi.servlets.rs.filters;

import java.lang.reflect.Method;
import java.util.Arrays;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.StringTokenizer;

import javax.annotation.security.DenyAll;
import javax.annotation.security.PermitAll;
import javax.annotation.security.RolesAllowed;
import javax.persistence.NoResultException;
import javax.ws.rs.container.ContainerRequestContext;
import javax.ws.rs.container.ContainerRequestFilter;
import javax.ws.rs.container.ResourceInfo;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MultivaluedMap;
import javax.ws.rs.core.Response;
import javax.ws.rs.ext.Provider;

import org.glassfish.jersey.internal.util.Base64;

import br.com.admi.entidades.modelos.Usuario;
import br.com.admi.repositorios.implementacoes.UsuarioRepository;
import br.com.admi.repositorios.interfaces.BuscaUsuarioRepository;

@Provider
public class FiltroAutenticacao implements ContainerRequestFilter{
	
	@Context
	private ResourceInfo infoRecurso;
	
	private static final String AUTHORIZATION_PROPERTY = "Authorization";
	private static final String AUTHORIZATION_SCHEME = "Basic";
	
	@Override
	public void filter(ContainerRequestContext requestContext) {
		Method metodo = infoRecurso.getResourceMethod();
		
		//Acesso permitido a todos
		if(!metodo.isAnnotationPresent(PermitAll.class)) {
			//Acesso bloqueado a todos
			if(metodo.isAnnotationPresent(DenyAll.class)) {
				requestContext.abortWith(Response.status(Response.Status.FORBIDDEN).entity("Acesso bloqueado a todos os usuários").build());
				return;
			}
			
			//Pega o cabeçalho da requisição
			final MultivaluedMap<String, String> headers = requestContext.getHeaders();
			
			//Pega o cabeçalho de autorização
			final List<String> autorizacao = headers.get(AUTHORIZATION_PROPERTY);
			
			//Se nenhuma informação de autorização estiver presente, bloqueia o acesso
			if(autorizacao == null || autorizacao.isEmpty()) {
				requestContext.abortWith(Response.status(Response.Status.UNAUTHORIZED).entity("Você não pode acessar este recurso").build());
				return;
			}
			
			//Pega o usuário e a senha codificados
			final String usuarioSenhaCodificado = autorizacao.get(0).replaceFirst(AUTHORIZATION_SCHEME + " ", "");
			
			//Decodifica o usuário e a senha
			String usuarioESenha = new String(Base64.decode(usuarioSenhaCodificado.getBytes()));
			
			//Dividi os tokens do usuário e da senha
			final StringTokenizer tokenizador = new StringTokenizer(usuarioESenha, ":");
			final String usuario = tokenizador.nextToken();
			final String senha = tokenizador.nextToken();
			
			//Verifica o acesso do usuário
			if(metodo.isAnnotationPresent(RolesAllowed.class)) {
				RolesAllowed rolesAnnotation = metodo.getAnnotation(RolesAllowed.class);
				Set<String> rolesSet = new HashSet<String>(Arrays.asList(rolesAnnotation.value()));
				
				//O usuário é valido?
				if(!isUserAllowed(usuario, senha, rolesSet)) {
					requestContext.abortWith(Response.status(Response.Status.UNAUTHORIZED).entity("Você não pode acessar este recurso").build());
					return;
				}
			}
		}
	}

	private boolean isUserAllowed(String usuario, String senha, Set<String> rolesSet) {
		boolean isAllowed = false;
		
		Usuario usuarioObj = new Usuario();
		usuarioObj.setUsuario(usuario);
		usuarioObj.setSenha(senha);
		BuscaUsuarioRepository<Usuario, Integer> usuarioRep = new UsuarioRepository();
		
		try{
			Usuario usuarioEncontrado = usuarioRep.buscaUsuario(usuarioObj);
			if (usuarioEncontrado != null) {
				if(rolesSet.contains(usuarioEncontrado.getRole().toString())) {
					isAllowed = true;
				}
			}
		} catch (NoResultException nre) {
			isAllowed = false;			
		}
		
		return isAllowed;
	}

}
