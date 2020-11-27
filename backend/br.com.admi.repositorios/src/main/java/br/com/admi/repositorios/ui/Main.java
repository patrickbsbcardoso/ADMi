package br.com.admi.repositorios.ui;

import java.util.List;

import br.com.admi.entidades.modelos.Membro;
import br.com.admi.repositorios.implementacoes.MembroRepository;
import br.com.admi.repositorios.interfaces.CrudRepository;

public class Main {

	public static void main(String[] args) {
		CrudRepository<Membro, Integer> membroService = new MembroRepository();
		System.out.println("***** GERENCIAMENTO DE PESSOAS *****");
		System.out.println("> Lista de pessoas cadastradas: \n");
		try {
			List<Membro> membros = membroService.buscaTodos();
			membros.forEach(membro -> {
				System.out.println("Funciona");
			});
			if (membros.isEmpty()) {
				System.out.println("Não Existem Pessoas Cadastradas");
			}
		} catch (Exception e) {
			System.out.println("Houve um erro ao usar a JPA " + e.getMessage());
			e.printStackTrace();
		}
	}

}
