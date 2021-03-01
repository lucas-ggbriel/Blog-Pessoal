import { NumberFormatStyle } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { AlertasService } from '../service/alertas.service';
import { AutenticacaoService } from '../service/autenticacao.service';
import { UsuarioService } from '../service/usuario.service';

@Component({
  selector: 'app-delecao',
  templateUrl: './delecao.component.html',
  styleUrls: ['./delecao.component.css']
})
export class DelecaoComponent implements OnInit {

  nomeUser: string = environment.nome

  constructor(
    private userService: UsuarioService,
    private autenticacao: AutenticacaoService,
    private alertas: AlertasService
  ) { }

  ngOnInit(){
    window.scroll(0,0)
    if(environment.token == ''){
      this.alertas.showAlertInfo(environment.mensagemLogado)
      this.autenticacao.sair()
    }
  }

  delecaoUsuario(){
    this.userService.deletarUsuario(environment.id).subscribe(() => {
      this.alertas.showAlertInfo("Conta excluída com sucesso!")

      this.autenticacao.sair()
    })
  }

}