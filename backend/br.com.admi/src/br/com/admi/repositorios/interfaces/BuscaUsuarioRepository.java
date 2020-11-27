package br.com.admi.repositorios.interfaces;

import br.com.admi.entidades.modelos.Usuario;

public interface BuscaUsuarioRepository<T, K> extends CrudRepository<T, K>{
	
	Usuario buscaUsuario(Usuario usuario);

}
