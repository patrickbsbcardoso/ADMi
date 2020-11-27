package br.com.admi.repositorios.interfaces;

import java.util.List;

public interface CrudRepository<T, K> {
	
	List<T> buscaTodos();
	T buscaPorId(K id);
	T insere(T entidade) throws Exception;
	T atualiza(T entidade) throws Exception;
	boolean deleta(K id);

}
