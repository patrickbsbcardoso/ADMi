package br.com.admi.entidades.modelos;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import br.com.admi.entidades.enums.Role;

@Entity
@Table(name = "usuario")
public class Usuario {	
	
	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator="usuario_sequence")
	private int id;
	
	@Column(length = 30, unique = true, nullable = false)
	private String usuario;
	
	@Column(nullable = false)
	private String senha;
	
	@Enumerated(EnumType.STRING)
	private Role role;


	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getUsuario() {
		return usuario;
	}

	public void setUsuario(String usuario) {
		this.usuario = usuario;
	}
	
	public String getSenha() {
		return senha;
	}

	public void setSenha(String senha) {
		this.senha = senha;
	}

	public Role getRole() {
		return role;
	}

	public void setRole(Role role) {
		this.role = role;
	}
	
	
	
}
