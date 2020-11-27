package br.com.admi.repositorios.implementacoes;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.NoResultException;
import javax.persistence.PersistenceException;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Root;

import org.hibernate.Session;

import br.com.admi.entidades.modelos.Membro;
import br.com.admi.entidades.modelos.Usuario;
import br.com.admi.repositorios.interfaces.BuscaUsuarioRepository;
import br.com.admi.repositorios.utils.FabricaEntityManager;

public class UsuarioRepository implements BuscaUsuarioRepository<Usuario, Integer> {

	@Override
	public List<Usuario> buscaTodos() {
		List<Usuario> usuarios = new ArrayList<Usuario>();
		EntityManager em = null;
		try {
			em = FabricaEntityManager.getEntityManager();
			usuarios = em.createQuery("from Usuario", Usuario.class).getResultList();
			return usuarios;
		} finally {
			if (em != null) {
				em.close();
			}
		}
	}

	@Override
	public Usuario buscaUsuario(Usuario usuario) {
		EntityManager em = null;
		try {
			em = FabricaEntityManager.getEntityManager();
			CriteriaBuilder criteriaBuilder = em.getCriteriaBuilder();
			CriteriaQuery<Usuario> buscaUsuarioCriteria = criteriaBuilder.createQuery(Usuario.class);
			Root<Usuario> raiz = buscaUsuarioCriteria.from(Usuario.class);
			buscaUsuarioCriteria
				.where(
					criteriaBuilder.and(
						criteriaBuilder.like(
							raiz.get("usuario"), usuario.getUsuario()
						),
						criteriaBuilder.like(
							raiz.get("senha"), usuario.getSenha()
						)
					)
				);
			Usuario usuarioEncontrado = em.createQuery(buscaUsuarioCriteria).getSingleResult();
			return usuarioEncontrado;
		} finally {
			if (em != null) {
				em.close();
			}
		}
	}

	@Override
	public Usuario buscaPorId(Integer id) {
		EntityManager em = null;
		try {
			em = FabricaEntityManager.getEntityManager();
			return em.find(Usuario.class, id);
		} finally {
			if(em != null) {
				em.close();
			}
		}
	}

	@Override
	public Usuario insere(Usuario entidade) throws Exception {
		EntityManager em = null;
		try {
			em = FabricaEntityManager.getEntityManager();
			em.getTransaction().begin();
			em.persist(entidade);
			em.getTransaction().commit();
			return entidade;
		}catch (PersistenceException e) {
			Throwable t = e;
			boolean cont = true;
			while (t != null) {
				if (t.getMessage().startsWith("Duplicate entry")) {
					cont = false;
					throw new Exception("Duplicate entry");
				}
				t = t.getCause(); 
			} 
			if (cont) {
				throw new Exception(e.getMessage());
			} 
		} finally {
			if (em != null) {
				em.close();
			}
		}
		return null;
	}

	@Override
	public Usuario atualiza(Usuario entidade) throws Exception {
		EntityManager em = null;
		try {
			em = FabricaEntityManager.getEntityManager();
			em.getTransaction().begin();
			em.unwrap(Session.class).update(entidade);
			em.getTransaction().commit();
			return entidade;
		}catch (PersistenceException e) {
			Throwable t = e;
			boolean cont = true;
			while (t != null) {
				if (t.getMessage().startsWith("Duplicate entry")) {
					cont = false;
					throw new Exception("Duplicate entry");
				}
				t = t.getCause(); 
			} 
			if (cont) {
				throw new Exception(e.getMessage());
			} 
		} finally {
			if(em != null) {
				em.close();
			}
		}
		return null;
	}

	@Override
	public boolean deleta(Integer id) {
		EntityManager em = null;
		try {
			em = FabricaEntityManager.getEntityManager();
			Usuario usuarioASerDeletado = em.find(Usuario.class, id);
			if (usuarioASerDeletado != null) {
				em.getTransaction().begin();
				em.remove(usuarioASerDeletado);
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
