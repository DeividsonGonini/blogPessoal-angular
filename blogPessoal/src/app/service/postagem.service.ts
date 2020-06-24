import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Postagem } from '../model/Postagem';

@Injectable({
  providedIn: 'root'
})
export class PostagemService {

  //variável para armazenar a URL principal
  urlApi: string = "http://localhost:8080";

  constructor(private http: HttpClient) { }

  //CRUD - Create(post), Read(get), Update(put) e Delete(delete).

  //Read - listara todas as postagens
  getAllPostagens() {
    // colocar o ip do servidor
    return this.http.get(this.urlApi + '/postagens');
  }

  //Create - Criação das postagens
  postPostagem(postagem: Postagem) {
    return this.http.post(this.urlApi + '/postagens', postagem);
  }

  //Update - atualiza a postagem
  putPostagem(postagem: Postagem) {
    return this.http.put(this.urlApi + '/postagens', postagem);
  }

  //Localiza a postagem pelo ID
  getByIdPostagem(id: number) {
    return this.http.get(this.urlApi + `/postagens/${id}`);
  }

  //Deleta a postagem pelo ID
  deletePostagem(id: number) {
    return this.http.delete(this.urlApi + `/postagens/${id}`)
  }

  //Busca por Titulo
  findByTitulo(titulo: string) {
    return this.http.get(this.urlApi + `/postagens/titulo/${titulo}`)
  }


}

