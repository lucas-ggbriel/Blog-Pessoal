import { NumberFormatStyle } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
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
    private autenticacao: AutenticacaoService
  ) { }

  ngOnInit(){

    this.autenticacao.logado() == false
  }

  delecaoUsuario(){
    this.userService.deletarUsuario(environment.id).subscribe(() => {
      alert("Conta excluída com sucesso!")

      this.autenticacao.sair()
    })
  }

}