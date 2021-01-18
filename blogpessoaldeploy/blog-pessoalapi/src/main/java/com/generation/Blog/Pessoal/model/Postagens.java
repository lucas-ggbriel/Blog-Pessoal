package com.generation.Blog.Pessoal.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;


@Entity
public class Postagens {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;
	private String data;
	@NotBlank
	@Size(min = 5, max = 40)
	private String texto;
	@NotBlank
	@Size(min = 5, max = 40)
	private String titulo;
	
	
	public long getId() {
		return id;
	}
	public void setId(long id) {
		this.id = id;
	}
	public String getData() {
		return data;
	}
	public void setData(String data) {
		this.data = data;
	}
	public String getTexto() {
		return texto;
	}
	public void setTexto(String texto) {
		this.texto = texto;
	}
	public String getTitulo() {
		return titulo;
	}
	public void setTitulo(String titulo) {
		this.titulo = titulo;
	}
	
	
}
