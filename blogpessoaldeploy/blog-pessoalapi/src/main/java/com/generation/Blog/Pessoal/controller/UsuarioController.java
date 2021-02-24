package com.generation.Blog.Pessoal.controller;

import java.util.Optional;

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

import com.generation.Blog.Pessoal.model.UserLogin;
import com.generation.Blog.Pessoal.model.Usuario;
import com.generation.Blog.Pessoal.repository.UsuarioRepository;
import com.generation.Blog.Pessoal.service.UsuarioService;

@RestController
@RequestMapping("/usuario")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class UsuarioController {

	@Autowired
	private UsuarioService usuarioService;

	@Autowired
	private UsuarioRepository usuarioRepository;

	@GetMapping("/{id}")
	public ResponseEntity<Usuario> usuarioPostagem(@PathVariable long id) {
		return ResponseEntity.ok(usuarioRepository.findUsuarioById(id));
	}

	@PostMapping("/logar")
	public ResponseEntity<UserLogin> Autentication(@RequestBody Optional<UserLogin> user) {
		return usuarioService.logar(user).map(resp -> ResponseEntity.ok(resp))
				.orElse(ResponseEntity.status(HttpStatus.UNAUTHORIZED).build());
	}

	@PostMapping("/cadastrar")
	public ResponseEntity<Usuario> Post(@RequestBody Usuario usuario) {
		return ResponseEntity.status(HttpStatus.CREATED).body(usuarioService.CadastrarUsuario(usuario));

	}

	@PutMapping
	public ResponseEntity<Usuario> putUser(Usuario user) {
		return ResponseEntity.status(HttpStatus.OK).body(usuarioRepository.save(user));
	}

	@DeleteMapping("/deletar/{id}")
	public void deletar(@PathVariable long id) {
		usuarioRepository.deleteById(id);
	}

}
