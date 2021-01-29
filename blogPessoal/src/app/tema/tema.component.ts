import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-tema',
  templateUrl: './tema.component.html',
  styleUrls: ['./tema.component.css']
})
export class TemaComponent implements OnInit {

  constructor(
   private routh: Router
  ) { }

  ngOnInit(){
    // if(environment.token == ''){
    //   alert("Sua seção expirou, por favor, faça o login novamente!")
    //   this.routh.navigate(["/entrar"])
    // }
  }

}
