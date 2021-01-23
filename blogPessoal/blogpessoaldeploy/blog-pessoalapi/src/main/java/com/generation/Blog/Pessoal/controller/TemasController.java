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
	
	@PostMapping("/cadastro")
	public ResponseEntity<String> cadastroDeTema(@RequestBody Temas tema){
		String verifica = temasRepository.findByDescricao(tema.getDescricao());
		
		if(verifica == null) {
			String sucesso = "Tema cadastrado com sucesso!";
			ResponseEntity.status(HttpStatus.CREATED).body(temasRepository.save(tema));
			return ResponseEntity.ok(sucesso);
		}else {
			String jaExiste = "Este tema já Existe! Por favor, cadastre um tema inexistente.";
			return ResponseEntity.ok(jaExiste);
		}
		
	}
	
	
	@PutMapping
	public ResponseEntity<Temas> PutTema(@RequestBody Temas putTema){
		return ResponseEntity.status(HttpStatus.OK).body(temasRepository.save(putTema));
	}
	
	@DeleteMapping("/{id}")
	public void delete(@PathVariable long id) {
		temasRepository.deleteAll();
	}
	
}
