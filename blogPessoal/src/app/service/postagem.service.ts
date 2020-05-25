import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Postagem } from '../model/Postagem';

@Injectable({
  providedIn: 'root'
})
export class PostagemService {

  constructor(private http: HttpClient) { }

  //CRUD - Create(post), Read(get), Update(put) e Delete(delete).

  //Read - listara todas as postagens
  getAllPostagens() {
    // colocar o ip do servidor
    return this.http.get('http://31.220.57.14:8080/postagens');
  }

  //Create - Criação das postagens
  postPostagem(postagem: Postagem) {
    return this.http.post('http://31.220.57.14:8080/postagens', postagem);
  }

  //Update - atualiza a postagem
  putPostagem(postagem: Postagem) {
    return this.http.put('http://31.220.57.14:8080/postagens', postagem);
  }

  //Localiza a postagem pelo ID
  getByIdPostagem(id: number) {
    return this.http.get(`http://31.220.57.14:8080/postagens/${id}`);
  }

  //Deleta a postagem pelo ID
  deletePostagem(id: number) {
    return this.http.delete(`http://31.220.57.14:8080/postagens/${id}`)
  }

  //Busca por Titulo
  findByTitulo(titulo: string) {
    return this.http.get(`http://31.220.57.14:8080/postagens/titulo/${titulo}`)
  }


}

