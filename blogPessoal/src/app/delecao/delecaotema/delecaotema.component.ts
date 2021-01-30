import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Temas } from 'src/app/model/Temas';
import { TemaService } from 'src/app/service/tema.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-delecaotema',
  templateUrl: './delecaotema.component.html',
  styleUrls: ['./delecaotema.component.css']
})
export class DelecaotemaComponent implements OnInit {
  tema: Temas = new Temas()
  idTema: number
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private temaService: TemaService
  ) { }

  ngOnInit(){
    if(environment.token == ""){
      alert(environment.mensagemLogado)
      this.router.navigate(['/entrar'])
    }

    this.idTema = this.route.snapshot.params['id']
    this.findByTemaId(this.idTema)
  }

  findByTemaId(id: number){
    this.temaService.getByIdTemas(id).subscribe((resp: Temas) => {
      this.tema = resp
    })

  }

  deletarTema(){
    this.temaService.deleteTema(this.idTema).subscribe(() => {
      alert("Tema apagado!")
      this.router.navigate(["/tema"])
    })
  }

}
