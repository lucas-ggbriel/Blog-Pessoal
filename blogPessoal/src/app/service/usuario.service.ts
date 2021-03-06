import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, ObservedValuesFromArray } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { Usuario } from '../model/Usuario';
import { UsuarioLogin } from '../model/UsuarioLogin';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(
    private http: HttpClient
  ) {}

    token = {
      headers: new HttpHeaders().set('Authorization', environment.token)
    }

  usuarioPostagem(id: number): Observable<Usuario>{
    return this.http.get<Usuario>(`http://localhost:8080/usuario/${id}`, this.token)
  }

  atualizaUsuario(user: Usuario): Observable<Usuario>{
    return this.http.put<Usuario>('http://localhost:8080/usuario', user, this.token)
  }

  trocaSenha(usuarioLogin: UsuarioLogin, novaSenha: String): Observable<UsuarioLogin>{
    return this.http.put<UsuarioLogin>(`http://localhost:8080/usuario/trocaSenha/${novaSenha}`, usuarioLogin,this.token)
  }

  deletarUsuario (id:number): Observable<Usuario>{
    return this.http.delete<Usuario>(`http://localhost:8080/usuario/deletar/${id}`, this.token)
  }
  
}
