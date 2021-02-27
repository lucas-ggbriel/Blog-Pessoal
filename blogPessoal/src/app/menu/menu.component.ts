import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { Usuario } from '../model/Usuario';
import { UsuarioService } from '../service/usuario.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
 
  public nome = environment.nome
  public urlImgMenu = environment.foto

  usuario: Usuario = new Usuario()

  constructor( 
    private router: Router,
    private usuarioService: UsuarioService
  ) {}

  
  ngOnInit(){
    this.getUsuarioById()
  }

  sair(){
    this.router.navigate(["/entrar"])
    environment.id = 0
    environment.token = ''
    environment.nome = ''
    environment.foto = ''
  }

  getUsuarioById(){  
    return this.usuarioService.usuarioPostagem(environment.id).subscribe((resp: Usuario) => {
      this.usuario = resp
    })
  }

  putUsuario(){
    return this.usuarioService.atualizaUsuario(this.usuario).subscribe((resp: Usuario) => {
      
      this.usuario = resp

      environment.foto = this.usuario.foto
      environment.nome = this.usuario.nome

      alert("Usuário cadastrado com sucesso")
    })
  }

  deleteUsuario(){
    return this.usuarioService.deletarUsuario(environment.id).subscribe(() => {
    })
  }

}
