import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { AutenticacaoService } from '../service/autenticacao.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {
  constructor(
   private routh: Router
  ) { }

  ngOnInit(){
    if(environment.token == ''){
      alert("Sua seção expirou, por favor, faça o login novamente!")
      this.routh.navigate(["/entrar"])
    }
  }
}
