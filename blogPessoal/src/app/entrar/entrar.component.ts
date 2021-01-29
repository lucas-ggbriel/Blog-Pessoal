import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { UsuarioLogin } from '../model/UsuarioLogin';
import { AutenticacaoService } from '../service/autenticacao.service';

@Component({
  selector: 'app-entrar',
  templateUrl: './entrar.component.html',
  styleUrls: ['./entrar.component.css']
})
export class EntrarComponent implements OnInit {

  usuarioLogin: UsuarioLogin = new UsuarioLogin()
  constructor(
    private entrar: AutenticacaoService,
    private router: Router
  ) { }

  ngOnInit(){
    window.scroll(0,0)
  }

  logar(){
    this.entrar.entrar(this.usuarioLogin).subscribe((resp: UsuarioLogin) => {
      this.usuarioLogin = resp

      environment.foto = this.usuarioLogin.foto
      environment.token = this.usuarioLogin.token
      environment.nome = this.usuarioLogin.nome

      console.log(environment.foto)
      console.log(environment.token)
      console.log(environment.nome)
      
      this.router.navigate(["/inicio"])
    }, erro => {if(erro.status == 500){
      alert("Usuário ou senha incorreto!")
    }
  }
      )
  }
}
