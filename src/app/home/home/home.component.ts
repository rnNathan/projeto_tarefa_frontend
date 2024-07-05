import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../shared/model/usuario';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  //standalone: true,
  //imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {

  public usuarioAutenticado: Usuario;

  constructor(private router: Router) { }

  ngOnInit(): void {

    let usuarioNoStorage = localStorage.getItem('usuarioAutenticado');
    if(usuarioNoStorage){
      this.usuarioAutenticado = JSON.parse(usuarioNoStorage);
    } else {
      this.router.navigate(['/login']);
    }
  }

  logout(){
    localStorage.removeItem('usuarioAutenticado');
    this.router.navigate(['/login'])
  }

}
