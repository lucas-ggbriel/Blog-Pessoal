import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Temas } from 'src/app/model/Temas';
import { TemaService } from 'src/app/service/tema.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-edicaotema',
  templateUrl: './edicaotema.component.html',
  styleUrls: ['./edicaotema.component.css']
})
export class EdicaotemaComponent implements OnInit {
  tema: Temas = new Temas()

  constructor(
    private temaService: TemaService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(){
    if(environment.token == ''){
      alert(environment.mensagemLogado)
      this.router.navigate(["/entrar"])
    }
    var id = this.route.snapshot.params['id']
    this.findByIdTemas(id)
    
  }

  findByIdTemas(id: number){
   this.temaService.getByIdTemas(id).subscribe((resp: Temas) =>{
    this.tema = resp
    })
  }

  atualizar(){
    return this.temaService.putTemas(this.tema).subscribe((resp: Temas) =>{
      this.tema = resp
      alert("Tema atualizado com sucesso!")
      this.router.navigate(["/tema"])
    })
  }

}
