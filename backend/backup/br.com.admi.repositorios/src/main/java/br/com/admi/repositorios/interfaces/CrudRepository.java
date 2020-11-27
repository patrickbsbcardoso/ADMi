package br.com.admi.repositorios.interfaces;

import java.util.List;

public interface CrudRepository<T, K> {
	
	List<T> buscaTodos();
	T buscaPorId(K id);
	T insere(T entidade);
	T atualiza(T entidade);
	void deleta(T entidade);
	void deletaPorId(K id);

}
