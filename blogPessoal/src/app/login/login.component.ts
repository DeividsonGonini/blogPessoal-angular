import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';
import { UserLogin } from '../model/UserLogin';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  userLogin: UserLogin = new UserLogin();
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }

  entrar() {
    this.authService.logar(this.userLogin).subscribe((resp: UserLogin) => {
      this.userLogin = resp;
      //insere o token no localStorage para garantir que o usuario esta logado e liberar a rota Feed
      localStorage.setItem('token', this.userLogin.token);
      //insere o nome do Usuario no localStorage para mostrarmos na Coluna fixada ao lado esquerdo
      localStorage.setItem('nome', this.userLogin.nome);
      this.router.navigate(['feed']);
    }, err => {
      alert('Houve um erro ao entrar, verifique o e-mail e a senha')
    })
  };
}
