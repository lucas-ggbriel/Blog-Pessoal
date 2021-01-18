package com.generation.Blog.Pessoal.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.generation.Blog.Pessoal.model.Postagens;
import com.generation.Blog.Pessoal.repository.PostagensRepository;

@RestController
@RequestMapping("/Postagens")
@CrossOrigin(value = "*", allowedHeaders = "*")
public class PostagensController {
	@Autowired
	PostagensRepository postagensRepository;
	
	@GetMapping
	public ResponseEntity<List<Postagens>> getPostagens(){
		return ResponseEntity.ok(postagensRepository.findAll());
	}
	
	@PostMapping
	public ResponseEntity<Postagens> Postagem(@RequestBody Postagens postagem){
		return ResponseEntity.status(HttpStatus.CREATED).body(postagensRepository.save(postagem));
	}
	
	@PutMapping
	public ResponseEntity<Postagens> edicao(@RequestBody Postagens edicao){
		return ResponseEntity.status(HttpStatus.OK).body(postagensRepository.save(edicao));
	}
	
	@DeleteMapping("/{id}")
	public void deletePostagem(@PathVariable long id) {
		postagensRepository.deleteAll();
	}
}
