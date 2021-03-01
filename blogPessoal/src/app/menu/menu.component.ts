import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { Usuario } from '../model/Usuario';
import { UsuarioLogin } from '../model/UsuarioLogin';
import { AlertasService } from '../service/alertas.service';
import { AutenticacaoService } from '../service/autenticacao.service';
import { UsuarioService } from '../service/usuario.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  nome = environment.nome
  urlImgMenu = environment.foto

  novaSenha: string

  usuario: Usuario = new Usuario()

  userLogin: UsuarioLogin = new UsuarioLogin()

  constructor(
    private usuarioService: UsuarioService,
    private autenticacao: AutenticacaoService,
    private alertas: AlertasService
  ) { }


  ngOnInit() {
    this.getUsuarioById()
  }

  sair() {
    this.autenticacao.sair()
  }

  getUsuarioById() {
    return this.usuarioService.usuarioPostagem(environment.id).subscribe((resp: Usuario) => {
      this.usuario = resp
    })
  }

  putUsuario() {
    console.log(this.usuario)

    return this.usuarioService.atualizaUsuario(this.usuario).subscribe((resp: Usuario) => {

      this.usuario = resp

      this.getUsuarioById()

      environment.foto = this.usuario.foto
      environment.nome = this.usuario.nome

      this.nome = environment.nome
      this.urlImgMenu = environment.foto

      this.alertas.showAlertSucess("Usuário atualizado com sucesso!")
    })
  }

  alterarSenha() {
    this.userLogin.id = environment.id

    this.usuarioService.trocaSenha(this.userLogin, this.novaSenha).subscribe((resp: UsuarioLogin) => {
      this.alertas.showAlertInfo("Senha alterada com sucesso!")

      this.autenticacao.sair()
      
    }, erro =>{
      if(erro.status == 400){
        this.alertas.showAlertDanger("O campo 'senha atual' não corresponde a senha atual!")
      }
    })
  }

}
