import { Component, OnInit } from '@angular/core';
import { PostagemService } from '../service/postagem.service';
import { Postagem } from '../model/Postagem';
import { Router } from '@angular/router';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit {

  // Variaves

  //atribuindo o valor do campo nome que esta no localStorage para uma variável
  nome: string = localStorage.getItem('nome');

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

  //variavel para armazenar o título utilizada no método pesquisarPorTitulo
  titulo: string;

  constructor(private postagemService: PostagemService, private router: Router) { }

  // metodo que nao precisa de interação humana, ele ja inicia automaticamente
  ngOnInit() {

    //Bloqueando o feed de ser acessado sem cadastro no site
    //pega o token que esta no localStorage
    let token = localStorage.getItem('token');
    //Se não tenha token no localStorage (o usuario nao se logou)
    if (token == null) {
      //exibe alerta para se logar
      alert("Faça o login antes de acessar a página Feed")
      //redireciona para a rota de login
      this.router.navigate(['/login'])
    }

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

  pesquisarPorTitulo() {
    this.postagemService.findByTitulo(this.titulo).subscribe((resp: Postagem[]) => {
      this.listaPostagens = resp
    })
  }

}
