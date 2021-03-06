import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router} from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { Usuario } from '../model/Usuario';
import { UsuarioLogin } from '../model/UsuarioLogin';

@Injectable({
  providedIn: 'root'
})
export class AutenticacaoService {

  constructor(
    private http: HttpClient,
    private router: Router
    ) {}

  entrar(usuarioLogin: UsuarioLogin):Observable<UsuarioLogin> {
    return this.http.post<UsuarioLogin>('http://localhost:8080/usuario/logar', usuarioLogin)
  }

  cadastrar(usuario: Usuario):Observable<Usuario> {
    return this.http.post<Usuario>('http://localhost:8080/usuario/cadastrar', usuario)
  }

  logado(){
    let ok: boolean = false

    if(environment.token != ''){
      ok = true    
    }
    
    return ok
  }

  adm(){
    let adm = false

    if(environment.tipo == "admin"){
      adm = true
    }

    return adm
  }

  sair(){
    this.router.navigate(["/entrar"])
    environment.id = 0
    environment.token = ''
    environment.nome = ''
    environment.foto = ''
    environment.tipo = ''
  }
}
