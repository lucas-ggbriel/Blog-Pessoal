import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { Temas } from '../model/Temas';
import { AutenticacaoService } from '../service/autenticacao.service';
import { TemaService } from '../service/tema.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {
  temaLista: Temas[]
  idTema: number
  tema: Temas

  constructor(
   private routh: Router,
   private temaService: TemaService
  ) { }

  ngOnInit(){
    if(environment.token == ''){
      alert(environment.mensagemLogado)
      this.routh.navigate(["/entrar"])
    }
  }

  findAllTemas(){
    return this.temaService.getAllTemas().subscribe((resp: Temas[]) =>{
      this.temaLista = resp
    })
  }

  findTemaById(id: number){
    return this.temaService.getByIdTemas(id).subscribe((resp: Temas) => {
      this.tema = resp
    })
  }


}
