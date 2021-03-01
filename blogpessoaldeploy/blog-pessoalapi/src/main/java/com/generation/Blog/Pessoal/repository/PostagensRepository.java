package com.generation.Blog.Pessoal.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.generation.Blog.Pessoal.model.Postagens;


public interface PostagensRepository extends JpaRepository<Postagens, Long>{

	@Query(value = "select * from postagens where usuario_id = :id", nativeQuery = true)
	public List<Postagens> postagensByUser(@Param("id") long id);
	
	public List<Postagens> findAllByTituloContainingIgnoreCase(String titulo);
}
