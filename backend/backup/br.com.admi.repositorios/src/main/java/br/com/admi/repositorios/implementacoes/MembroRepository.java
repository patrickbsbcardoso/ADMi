package br.com.admi.repositorios.implementacoes;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.EntityManager;

import org.hibernate.Session;

import br.com.admi.entidades.modelos.Membro;
import br.com.admi.repositorios.interfaces.CrudRepository;
import br.com.admi.repositorios.utils.FabricaEntityManager;

public class MembroRepository implements CrudRepository<Membro, Integer>{

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

	public Membro atualiza(Membro entidade) {
		EntityManager em = null;
		try {
			em = FabricaEntityManager.getEntityManager();
			em.getTransaction().begin();
			em.unwrap(Session.class).update(entidade);
			return entidade;
		} finally {
			if(em != null) {
				em.close();
			}
		}
	}

	public void deleta(Membro entidade) {
		EntityManager em = null;
		try {
			em = FabricaEntityManager.getEntityManager();
			em.getTransaction().begin();
			em.remove(entidade);
			em.getTransaction().commit();
		} finally {
			if(em != null) {
				em.close();
			}
		}
	}

	public void deletaPorId(Integer id) {
		EntityManager em = null;
		try {
			em = FabricaEntityManager.getEntityManager();
			Membro membroASerDeletado = em.find(Membro.class, id);
			if (membroASerDeletado != null) {
				em.getTransaction().begin();
				em.remove(membroASerDeletado);
				em.getTransaction().commit();				
			}
		} finally {
			if(em != null) {
				em.close();
			}
		}
	}

}
