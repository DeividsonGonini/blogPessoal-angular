import { Component } from '@angular/core';

@Component({
  // a TAG criada, é o seletor
  selector: 'app-root',
  // indicação do arquivo HTML
  templateUrl: './app.component.html',
  // indicação do arquivo de estilo
  styleUrls: ['./app.component.css']
})

//Classe exportada
export class AppComponent {
  //variavel com uma string
  title = 'blogPessoal';
}
