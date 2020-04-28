import { Component, OnInit } from '@angular/core';
import { PostagemService } from '../service/postagem.service';
import { Postagem } from '../model/Postagem';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit {

  // Variaves

  // key e reverse sao palavras reservadas do Orderby
  // a chave da ordenação
  key = 'data';
  // inverte o valor padrão
  reverse = true;

  // Variavel para listar todas as postagens (Array)
  listaPostagens: Postagem[];
  // Variavel para inserir uma nova postagem
  postagem: Postagem = new Postagem;

  constructor(private postagemService: PostagemService) { }

  // metodo que nao precisa de interação humana, ele ja inicia automaticamente
  ngOnInit(): void {
    this.findallPostagens()
  }

  findallPostagens() {
    this.postagemService.getAllPostagens().subscribe((resp: Postagem[]) => {
      this.listaPostagens = resp;
    })
  }

  publicar() {
    this.postagemService.postPostagem(this.postagem).subscribe((resp: Postagem) => {
      this.postagem = resp;

      // faz o reload automatico da pagina apos a função ser chamada
      location.assign('/feed');
    })
  }

}
