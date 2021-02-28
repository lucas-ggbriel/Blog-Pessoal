import { ThrowStmt } from '@angular/compiler';
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
  
  // variáveis e arrays de postagem
  idPostagem: number
  postagensLista: Postagens[]
  postagensUser: Postagens[]
  postagem: Postagens = new Postagens()

  // variáveis e arrays de temas
  idTema: number
  idTemaCadastro: number
  tema: Temas = new Temas()
  temaCadastro = new Temas()
  temaLista: Temas[]

  // objeto usuario
  usuario: Usuario = new Usuario()

  // validação do ngIf de postagens por tema
  ok: boolean = false

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
    }else{
      window.scroll(0,0)
      this.findAllTemas()
      this.findAllPostagens()
      this.usuarioPostagem()
    }
  }

  // método para busca dos dados do usuário que está cadastrando uma postagem
  usuarioPostagem(){
    return this.usuarioService.usuarioPostagem(environment.id).subscribe((resp: Usuario) => {
      this.usuario = resp
    })
  }

  // listagem de todos os temas
  findAllTemas(){
    return this.temaService.getAllTemas().subscribe((resp: Temas[]) =>{
      this.temaLista = resp
    })
  }

  // listagem de todas as postagens
  findAllPostagens(){
    return this.postagemService.listagemPostagens().subscribe((resp: Postagens[]) => {
      this.postagensLista = resp
    })
  }

  // busca de todas as postagens de um tema específico
  findPostagemByTema(){
    return this.postagemService.listarPostagensByTema().subscribe((resp: Temas) => {

    })
  }

  // busca de todas as postagens do usuário que está logado
  findPostagemByUser(){
    return this.postagemService.listarPostagensByUser(environment.id).subscribe((resp: Postagens[]) => {
      this.postagensUser = resp
    })
  }

  // busca uma postagem usando o id como paramêtro
  findPostagemById(id: number){
    return this.postagemService.postagemPorId(id).subscribe((resp: Postagens) => {
      this.postagem = resp
    })
  }

  // busca de um tema usando id como paramêtro; nesse método usamos os dados retornados no objeto temaCadastro para cadastro de um novo tema
  findTemaId(id: number){
    return this.temaService.getByIdTemas(id).subscribe((resp: Temas) => {
      this.temaCadastro = resp
    })
  }

  // busca de um tema específico que utiliza o id como paramêtro
  findTemaById(id: number){
    return this.temaService.getByIdTemas(id).subscribe((resp: Temas) => {
      this.tema = resp

      if(this.tema.postagens.length == 0){
        this.ok = true
      }else{
        this.ok = false
      }
    })
  }

  // método para o cadastro de uma nova postagem
  cadastrarPostagem(){
    this.postagem.tema = this.temaCadastro
    this.postagem.usuario = this.usuario

    this.postagemService.cadastroPostagem(this.postagem).subscribe(() => {
      alert("Postagem cadastrada com sucesso!")
      this.findAllPostagens()
      this.postagem = new Postagens()

      this.findTemaById(this.idTema)
      
      this.idTemaCadastro = 0
    }
    )
  }

  // método para atualização de uma postagem
  putPostagem(){
    this.postagem.tema = this.temaCadastro

    return this.postagemService.putPostagem(this.postagem).subscribe(() => {
      alert("Postagem atualizada com sucesso!")
      this.findPostagemByUser()
      this.postagem = new Postagens()
      this.idTemaCadastro = 0
    })
  }

  // método para deleção
  deletarPostagem(){
    return this.postagemService.deletarPostagem(this.postagem.id).subscribe(() => {
      alert("Postagem deletada com sucesso!")

      this.findPostagemByUser()
      this.postagem = new Postagens()
      this.idTemaCadastro = 0
    })
  }

  // limpar campos do objeto postagem
  limpar(){
    this.postagem = new Postagens()
    this.idTemaCadastro = 0
  }
}
