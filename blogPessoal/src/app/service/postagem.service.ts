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

}
