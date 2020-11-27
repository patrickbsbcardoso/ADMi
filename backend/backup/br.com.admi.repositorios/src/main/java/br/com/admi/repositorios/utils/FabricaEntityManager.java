package br.com.admi.repositorios.utils;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;

public class FabricaEntityManager {
	
	private static EntityManagerFactory FABRICA_ENTITY_MANAGER = null;
	
	public static EntityManager getEntityManager() {
		
		if(FABRICA_ENTITY_MANAGER == null) {
			FABRICA_ENTITY_MANAGER = Persistence.createEntityManagerFactory("admi-db");
		}
		
		return FABRICA_ENTITY_MANAGER.createEntityManager();
	}

}
