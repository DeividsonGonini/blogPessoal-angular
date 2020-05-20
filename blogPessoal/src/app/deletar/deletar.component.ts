import { Component, OnInit } from '@angular/core';
import { Postagem } from '../model/Postagem';
import { PostagemService } from '../service/postagem.service';
import { ActivatedRoute, Router } from '@angular/router';
import { BuiltinFunctionCall } from '@angular/compiler/src/compiler_util/expression_converter';

@Component({
  selector: 'app-deletar',
  templateUrl: './deletar.component.html',
  styleUrls: ['./deletar.component.css']
})
export class DeletarComponent implements OnInit {

  //instanciar o objeto Postagem
  postagem: Postagem = new Postagem;

  //variavel deleção OK para mostrar que deu certo
  delOk: boolean = false;

  //injeção de dependencias - o que vai dentro do constructor
  constructor(private postagemService: PostagemService, private route: ActivatedRoute, private router: Router) { }

  //função carregada automaticamente com o componente
  ngOnInit(): void {
    //pegar o id que sera passado atravez da rota atual
    let id: number = this.route.snapshot.params['id'];
    //Carregar o findById para receber o parametro, (no caso o ID) para ja ser startado quando carregar
    this.findById(id);
  }


  findById(id: number) {
    //chamar o Serviço postagemService, o getById passando o Id e retornando uma postagem completa
    this.postagemService.getByIdPostagem(id).subscribe((resp: Postagem) => {
      //a resposta vai receber a resposta com todas as postagens que estao no servidor
      this.postagem = resp;
      //tratamento de erro
    }, err => {
      //console que mostrara o status do erro
      console.log(`Erro: ${err.status}, não conseguimos pegar o Id`)
    })
  }

  //Sempre perguntar ao usuario se ele realmente quer Deletar
  //para isso criar 2 metodos, 1 para SIM e outro para NÃO

  btnSim() {
    //chama no service o Endpoit deletePostagem passando o parametro DESSA (que veio para a pagina de deleção) postagem o ID
    this.postagemService.deletePostagem(this.postagem.id).subscribe(() => {
      //utilizada para mostrar um alert de sucesso ao deletar na pagina/rota que sera encaminhada apos a deletar(feed)
      this.delOk = true;
      //para enviar o item ao localStorage que so aceita do tipo string
      //ir para a rota que deseja ir (feed)
      this.router.navigate(['/feed']);
      //enviar atraves do localStorage (1º parametro titulo / 2 º o que sera passado)
      //.toString serve para converter a variavel(booleana) para string
      localStorage.setItem("delOk", this.delOk.toString())
    })
  }

  //Caso não queira deletar ira voltar para a pagina anterior (onde aparecem as postagens)
  btnNao() {
    //precisa da injeção de dependencia = private router: Router
    this.router.navigate(['/feed']);
  }



}


