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

  //variavel para controlar o aparecimento do alerta
  //false para nao ficar aparecendo a todo momento
  alerta: boolean = false

  constructor(private postagemService: PostagemService) { }

  // metodo que nao precisa de interação humana, ele ja inicia automaticamente
  ngOnInit(): void {
    this.findallPostagens()

    // sempre que abrir o Feed ira para o início da página
    window.scroll(0, 0);

    //variavel que ira receber o que estiver dentro do localStorage
    let item: string = localStorage.getItem('delOk')
    //condição para mostrar o alerta
    if (item == "true") {
      //pega a variavel alerta e atribui True
      this.alerta = true;
      //limpa o localStorage
      localStorage.clear();

      // para o alerta aparecer durante um tempo antes de ser apagado (atrasa a função de Atualizar)
      setTimeout(() => {
        //atualiza a pagina para limpar o localStorage
        location.assign('/feed')
      }, 3000)
    }
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
