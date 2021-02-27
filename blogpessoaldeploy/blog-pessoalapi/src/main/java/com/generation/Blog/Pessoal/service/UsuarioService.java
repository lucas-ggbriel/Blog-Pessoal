package com.generation.Blog.Pessoal.service;

import java.nio.charset.Charset;
import java.util.Optional;

import org.apache.commons.codec.binary.Base64;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.generation.Blog.Pessoal.model.UserLogin;
import com.generation.Blog.Pessoal.model.Usuario;
import com.generation.Blog.Pessoal.repository.UsuarioRepository;



@Service
public class UsuarioService {
	
	@Autowired
	private UsuarioRepository repository;
	
	public ResponseEntity.BodyBuilder verificarUsuario(UserLogin user) {
		BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
		Usuario usuario = repository.findUsuarioById(user.getId());
		
		if(encoder.matches(user.getSenha(), usuario.getSenha())) {
			usuario.setSenha(user.getSenha());
			repository.save(usuario);
			return ResponseEntity.status(HttpStatus.ACCEPTED);
		}else {
			return ResponseEntity.status(HttpStatus.CONFLICT);
		}
	}
	
	public Usuario CadastrarUsuario(Usuario usuario) {
		BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

		String senhaEncoder = encoder.encode(usuario.getSenha());
		usuario.setSenha(senhaEncoder);

		return repository.save(usuario);
	}
	
	public Optional<UserLogin> logar(Optional<UserLogin> user){
		BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
		Optional<Usuario> usuario = repository.findByUsuario(user.get().getUsuario());
		
		
		if(usuario.isPresent()) {
			if(encoder.matches(user.get().getSenha(), usuario.get().getSenha()) && user.get().getUsuario().equals(usuario.get().getUsuario())) {
				
				String auth = user.get().getUsuario() + ":" + user.get().getSenha();
				byte[] encodeAuth = Base64.encodeBase64(auth.getBytes(Charset.forName("US-ASCII")));
				String authHeader = "Basic " + new String(encodeAuth);
				
				user.get().setToken(authHeader);
				user.get().setNome(usuario.get().getNome());
				user.get().setFoto(usuario.get().getFoto());
				user.get().setTipo(usuario.get().getTipo());
			    user.get().setId(usuario.get().getId());
				
				return user;
			}
		}
		
		return null;
	}
}
