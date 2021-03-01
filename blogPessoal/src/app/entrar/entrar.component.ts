import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { Usuario } from '../model/Usuario';
import { UsuarioLogin } from '../model/UsuarioLogin';
import { AlertasService } from '../service/alertas.service';
import { AutenticacaoService } from '../service/autenticacao.service';

@Component({
  selector: 'app-entrar',
  templateUrl: './entrar.component.html',
  styleUrls: ['./entrar.component.css']
})
export class EntrarComponent implements OnInit {

  usuarioLogin: UsuarioLogin = new UsuarioLogin()

  usuario: Usuario = new Usuario()
  
  constructor(
    private entrar: AutenticacaoService,
    private router: Router,
    private alertas: AlertasService
  ) { }

  ngOnInit(){
    window.scroll(0,0)
  }

  logar(){
    this.entrar.entrar(this.usuarioLogin).subscribe((resp: UsuarioLogin) => {
      this.usuarioLogin = resp

      environment.id = this.usuarioLogin.id
      environment.foto = this.usuarioLogin.foto
      environment.token = this.usuarioLogin.token 
      environment.nome = this.usuarioLogin.nome
      environment.usuario = this.usuarioLogin.usuario

      this.router.navigate(["/inicio"])
    }, erro => {if(erro.status == 500){
      this.alertas.showAlertDanger("Usuário ou senha incorreto!")
    }
  }
      )
  }


}
