import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { Postagens } from '../model/Postagens';
import { Temas } from '../model/Temas';
import { Usuario } from '../model/Usuario';
import { PostagemService } from '../service/postagem.service';
import { TemaService } from '../service/tema.service';
import { UsuarioService } from '../service/usuario.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {
  temaLista: Temas[]
  postagensLista: Postagens[]

  idTema: number
  tema: Temas = new Temas()

  usuario: Usuario = new Usuario()

  postagem: Postagens = new Postagens()

  constructor(
   private routh: Router,
   private temaService: TemaService,
   private usuarioService: UsuarioService,
   private postagemService: PostagemService
  ) { }

  ngOnInit(){
    if(environment.token == ''){
      alert(environment.mensagemLogado)
      this.routh.navigate(["/entrar"])
    }

    this.findAllTemas()
    this.usuarioPostagem()
  }

  usuarioPostagem(){
    return this.usuarioService.usuarioPostagem(environment.id).subscribe((resp: Usuario) => {
      this.usuario = resp
    })
  }

  findAllTemas(){
    return this.temaService.getAllTemas().subscribe((resp: Temas[]) =>{
      this.temaLista = resp
    })
  }

  findAllPostagens(){
    return this.postagemService.listagemPostagens().subscribe((resp: Postagens[]) => {
      this.postagensLista = resp
    })
  }

  findTemaById(){
    return this.temaService.getByIdTemas(this.idTema).subscribe((resp: Temas) => {
      this.tema = resp
    })
  }
  
  findUsuario(){
    
  }

  cadastrarPostagem(){

    this.postagem.tema = this.tema
    this.postagem.usuario = this.usuario

    this.postagemService.cadastroPostagem(this.postagem).subscribe(() => {
      alert("Postagem cadastrada com sucesso!")
      this.findAllPostagens()
    }
    )

  }

}
