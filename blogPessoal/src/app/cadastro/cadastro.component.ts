import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';
import { User } from '../model/User';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {
  user: User = new User();
  senha: string;
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  //any - tanto faz o tipo do evento
  //metodo não confere a senha, ele armazena a senha passada pelo evento do input, a conferencia sera no cadastrar()
  conferirSenha(event: any) {
    //target traz o valor do evento (o que foi digitado pelo usuario)
    this.senha = event.target.value;
  }


  cadastrar() {
    //if para conferir se a senha passada pelo usuario no Senha é igual a passada pelo Conferir Senha no html
    if (this.senha === this.user.senha) {
      this.authService.cadastrar(this.user).subscribe((resp: User) => {
        this.user = resp;
        this.router.navigate(['/login']);
        alert('Usuário cadastrado com sucesso!');
      });
    } else {
      alert('As senhas não são iguais.');
    }

  }

}
