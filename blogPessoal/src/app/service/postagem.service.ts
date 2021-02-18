import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { Postagens } from '../model/Postagens';
import { Temas } from '../model/Temas';

@Injectable({
  providedIn: 'root'
})
export class PostagemService {

  constructor(
    private http: HttpClient
  ) {}

  token = {
    headers: new HttpHeaders().set("Authorization", environment.token)
  }

  cadastroPostagem(postagem: Postagens): Observable<Postagens>{
    return this.http.post<Postagens>('http://localhost:8080/Postagens', postagem ,this.token)
  }

  listagemPostagens(): Observable<Postagens[]>{
    return this.http.get<Postagens[]>('http://localhost:8080/Postagens', this.token)
  }

  listarPostagensByTema(): Observable<Temas>{
    return this.http.get<Temas>('http://localhost:8080/temas', this.token)
  }

  listarPostagensByUser(id: number): Observable<Postagens[]>{
    return this.http.get<Postagens[]>(`http://localhost:8080/Postagens/postagens/${id}`, this.token)
  }

  postagemPorId(id: number): Observable<Postagens>{
    return this.http.get<Postagens>(`http://localhost:8080/Postagens/${id}`, this.token)
  }
  
  putPostagem(postagem: Postagens): Observable<Postagens>{
    return this.http.put<Postagens>('http://localhost:8080/Postagens', postagem, this.token)
  }

  deletarPostagem(id: number){
    return this.http.delete(`http://localhost:8080/Postagens/${id}`, this.token)
  }

}
