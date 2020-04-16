import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PostagemService {

  constructor(private http: HttpClient) { }

  //CRUD - Create, Ready, Update e Delete.

  //Read - listara todas as postagens
  getAllPostagens() {
    // colocar o ip do servidor
    return this.http.get('http://31.220.57.14:8080/postagens')
  }
}
