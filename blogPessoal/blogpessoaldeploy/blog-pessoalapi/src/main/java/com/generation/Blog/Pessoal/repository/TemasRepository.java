package com.generation.Blog.Pessoal.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.generation.Blog.Pessoal.model.Temas;

@Repository
public interface TemasRepository extends JpaRepository<Temas, Long>{
		
	@Query(value = "SELECT id FROM temas where descricao = :descricao", nativeQuery = true)
	public String findByDescricao(@Param ("descricao") String descricao);
		
		
}
