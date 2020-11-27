package br.com.admi.repositorios.implementacoes;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceException;

import org.hibernate.Session;

import br.com.admi.entidades.modelos.Membro;
import br.com.admi.repositorios.interfaces.CrudRepository;
import br.com.admi.repositorios.utils.FabricaEntityManager;

public class MembroRepository implements CrudRepository<Membro, Integer>{
	
	@Override
	public List<Membro> buscaTodos() {
		List<Membro> membros = new ArrayList<Membro>();
		EntityManager em = null;
		try {
			em = FabricaEntityManager.getEntityManager();
			membros = em.createQuery("from Membro", Membro.class).getResultList();
			return membros;
		} finally {
			if(em != null) {
				em.close();
			}
		}
	}

	@Override
	public Membro buscaPorId(Integer id) {
		EntityManager em = null;
		try {
			em = FabricaEntityManager.getEntityManager();
			return em.find(Membro.class, id);
		} finally {
			if(em != null) {
				em.close();
			}
		}
	}
	
	@Override
	public Membro insere(Membro entidade) {
		EntityManager em = null;
		try {
			em = FabricaEntityManager.getEntityManager();
			em.getTransaction().begin();
			em.persist(entidade);
			em.getTransaction().commit();
			return entidade;
		} finally {
			if(em != null) {
				em.close();
			}
		}
	}
	
	@Override
	public Membro atualiza(Membro entidade) {
		EntityManager em = null;
		try {
			em = FabricaEntityManager.getEntityManager();
			em.getTransaction().begin();
			em.unwrap(Session.class).update(entidade);
			em.getTransaction().commit();
			return entidade;
		} finally {
			if(em != null) {
				em.close();
			}
		}
	}
	
	@Override
	public boolean deleta(Integer id) {
		EntityManager em = null;
		try {
			em = FabricaEntityManager.getEntityManager();
			Membro membroASerDeletado = em.find(Membro.class, id);
			if (membroASerDeletado != null) {
				em.getTransaction().begin();
				em.remove(membroASerDeletado);
				em.getTransaction().commit();	
				return true;
			}
		} catch (PersistenceException pe) {
			return false;
		} finally {
			if(em != null) {
				em.close();
			}
		}
		return false;
	}

}
