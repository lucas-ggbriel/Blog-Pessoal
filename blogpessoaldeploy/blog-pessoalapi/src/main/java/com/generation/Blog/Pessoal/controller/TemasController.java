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

import com.generation.Blog.Pessoal.model.Temas;
import com.generation.Blog.Pessoal.repository.TemasRepository;


@RestController
@RequestMapping("/temas")
@CrossOrigin(value = "*", allowedHeaders = "*")
public class TemasController {
	
	@Autowired
	TemasRepository temasRepository;
	
	@GetMapping
	public ResponseEntity<List<Temas>> GetAllTemas(){
		return ResponseEntity.ok(temasRepository.findAll());
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<Temas> findAllTemas(@PathVariable long id){
		return temasRepository.findById(id).map(resp -> ResponseEntity.ok(resp)).orElse(ResponseEntity.notFound().build());
		
	}
	
	@PostMapping
	public ResponseEntity<Temas> cadastroDeTema(@RequestBody Temas tema){
		return ResponseEntity.status(HttpStatus.CREATED).body(temasRepository.save(tema));
	}
	
	
	@PutMapping
	public ResponseEntity<Temas> PutTema(@RequestBody Temas putTema){
		return ResponseEntity.status(HttpStatus.OK).body(temasRepository.save(putTema));
	}
	
	@DeleteMapping("/{id}")
	public void delete(@PathVariable long id) {
		temasRepository.deleteById(id);
	}
	
}
