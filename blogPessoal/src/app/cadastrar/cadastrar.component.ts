import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from '../model/Usuario';
import { AlertasService } from '../service/alertas.service';
import { AutenticacaoService } from '../service/autenticacao.service';

@Component({
  selector: 'app-cadastrar',
  templateUrl: './cadastrar.component.html',
  styleUrls: ['./cadastrar.component.css']
})
export class CadastrarComponent implements OnInit {

  usuario: Usuario = new Usuario()
  senhaVerifica: string
  usuarioTipo: string

  constructor(
    private service: AutenticacaoService,
    private routh: Router,
    private alertas: AlertasService
    ) {}

  ngOnInit() {
    window.scroll(0,0)
  }

  verficaSenha(event: any){
    this.senhaVerifica = event.target.value
  }

  tipoUsuario(event: any){
    this.usuarioTipo = event.target.value
  }

  cadastrar(){
    this.usuario.tipo = this.usuarioTipo

    if(this.usuario.senha != this.senhaVerifica){
      this.alertas.showAlertDanger("As senhas não coincidem!")
    }else{
      this.service.cadastrar(this.usuario).subscribe((resp: Usuario) => {
        this.usuario = resp
        this.routh.navigate(["/entrar"])
        this.alertas.showAlertSucess("Usuário cadastrado com sucesso!")
        

      })
    }
  }
}
