import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Postagem } from '../model/Postagem';

@Injectable({
  providedIn: 'root'
})
export class PostagemService {

  //variável para armazenar a URL principal
  urlApi: string = "http://localhost:8080";

  constructor(private http: HttpClient) { }

  //capturando o token do localStorage e passando ele pelo Header para poder Autorizar
  //token é um objeto que tem um headers
  token = {
    //set('Authorization', localStorage.getItem('token')) - esta setando o campo Authorization o token capturado do localStorage
    headers: new HttpHeaders().set('Authorization', localStorage.getItem('token'))
  };



  //CRUD - Create(post), Read(get), Update(put) e Delete(delete).

  //Read - listara todas as postagens
  getAllPostagens() {
    // colocar o ip do servidor
    return this.http.get(this.urlApi + '/postagens', this.token);
  }

  //Create - Criação das postagens
  postPostagem(postagem: Postagem) {
    return this.http.post(this.urlApi + '/postagens', postagem, this.token);
  }

  //Update - atualiza a postagem
  putPostagem(postagem: Postagem) {
    return this.http.put(this.urlApi + '/postagens', postagem, this.token);
  }

  //Localiza a postagem pelo ID
  getByIdPostagem(id: number) {
    return this.http.get(this.urlApi + `/postagens/${id}`, this.token);
  }

  //Deleta a postagem pelo ID
  deletePostagem(id: number) {
    return this.http.delete(this.urlApi + `/postagens/${id}`, this.token)
  }

  //Busca por Titulo
  findByTitulo(titulo: string) {
    return this.http.get(this.urlApi + `/postagens/titulo/${titulo}`, this.token)
  }


}

