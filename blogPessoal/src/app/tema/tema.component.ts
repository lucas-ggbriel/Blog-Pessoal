import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { Temas } from '../model/Temas';
import { AlertasService } from '../service/alertas.service';
import { AutenticacaoService } from '../service/autenticacao.service';
import { TemaService } from '../service/tema.service'

@Component({
  selector: 'app-tema',
  templateUrl: './tema.component.html',
  styleUrls: ['./tema.component.css']
})
export class TemaComponent implements OnInit {
  tema: Temas = new Temas()
  listaTemas: Temas[]
  
  temaListagem: Temas = new Temas()
  
  constructor(
   private temaService: TemaService,
   private auth: AutenticacaoService,
   private alertas: AlertasService
  ) { }

  ngOnInit(){
    if(environment.token == ''){
      this.alertas.showAlertInfo(environment.mensagemLogado)
      this.auth.sair()
    }else{
      this.findAllTemas()
    }
  }
  
  findAllTemas(){
    this.temaService.getAllTemas().subscribe((resp: Temas[]) =>
    this.listaTemas = resp
    )
  }

  findTemaById(id: number){
    this.temaService.getByIdTemas(id).subscribe((resp: Temas) => {
      this.temaListagem = resp
    })
  }

  cadastrarTema(){

    this.temaService.postTemas(this.tema).subscribe((resp: Temas) => {
      this.tema = resp
      this.alertas.showAlertSucess("Tema cadastrado com sucesso!")
      this.findAllTemas()
      this.tema = new Temas()
    })

  }

  atualizarTema(){
    this.temaService.putTemas(this.temaListagem).subscribe(() => {
      this.alertas.showAlertSucess('Tema atualizado com sucesso!')
      this.findAllTemas()
    })
  }

  deletarTema(id: number){
    this.temaService.deleteTema(id).subscribe(() => {
      this.alertas.showAlertInfo("Tema deletado!")
      this.findAllTemas()
    })
  }

}
