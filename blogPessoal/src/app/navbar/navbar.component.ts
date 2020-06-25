import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  //auth tem que ser public para chamarmos ele no html
  constructor(private router: Router, public auth: AuthService) { }

  ngOnInit(): void {
  }

  //metodo para fazer Logout
  sair() {
    this.router.navigate(['/login']);
    localStorage.clear();
  }


}
