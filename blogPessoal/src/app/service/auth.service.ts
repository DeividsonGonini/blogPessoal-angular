import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserLogin } from '../model/UserLogin';
import { User } from '../model/User';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  //variável para armazenar a URL principal
  urlApi: string = "http://localhost:8080";


  //injeção de dependências
  constructor(private http: HttpClient) { }

  //olhar a rota (usuarios/logar) no UsuarioController no Spring
  //utilizaremos a model UsuarioLogin(do Spring) para Logar 
  //pede um objeto do tipo UserLogin para poder realizar a requisição do tipo POST
  logar(userLogin: UserLogin) {
    return this.http.post(this.urlApi + '/usuarios/logar', userLogin);
  }

  //olhar a rota (/usuarios/cadastrar) no UsuarioController no Spring
  //utilizaremos a model Usuario(do Spring) para Cadastrar 
  cadastrar(user: User) {
    return this.http.post(this.urlApi + '/usuarios/cadastrar', user)
  }

  //aparecer o botao Sair apenas quando o usuario estiver logado
  btnSair() {
    let ok = false;
    let token = localStorage.getItem('token');

    //se o token nao for nulo
    if (token != null) {
      ok = true;
    }
    //retorna booleano de true ou false
    return ok;
  }

  //aparecer o botao Login e Cadastrar apenas quando o usuario Não estiver logado
  btnLogin() {
    let ok = false;
    let token = localStorage.getItem('token');

    //se o token for nulo (se nao tiver token)
    if (token == null) {
      ok = true;
    }
    //retorna booleano de true ou false
    return ok;
  }

}
