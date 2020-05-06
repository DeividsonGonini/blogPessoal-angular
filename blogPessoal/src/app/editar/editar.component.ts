import { Component, OnInit } from '@angular/core';
import { PostagemService } from '../service/postagem.service';
import { Postagem } from '../model/Postagem';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.css']
})
export class EditarComponent implements OnInit {
  postagem: Postagem = new Postagem;
  //Onde são feitas as injeções de dependencias
  constructor(private postagemService: PostagemService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {

    //pegar o ID
    //route = rota ativa   / snapshot = pegar  /params = parametro desejado
    let id = this.route.snapshot.params['id'];
    //passar para o findById o ID 
    this.findById(id)
  }

  //Editat a postegem
  findById(id: number) {
    this.postagemService.getByIdPostagem(id).subscribe((resp: Postagem) => {
      this.postagem = resp;
    })
  }

  //Salvar a edição
  salvar() {
    this.postagemService.putPostagem(this.postagem).subscribe((resp: Postagem) => {
      this.postagem = resp;
      //navegar para a rota desejada
      this.router.navigate(['/feed']);
      // atualizar a pagina (para atualizar a lista)
      location.assign('feed')
    })
  }

}
