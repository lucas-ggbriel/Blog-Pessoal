import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { Temas } from '../model/Temas';
import { AutenticacaoService } from '../service/autenticacao.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {
  temaLista: Temas[]

  constructor(
   private routh: Router
  ) { }

  ngOnInit(){
    if(environment.token == ''){
      alert(environment.mensagemLogado)
      this.routh.navigate(["/entrar"])
    }
  }


}
