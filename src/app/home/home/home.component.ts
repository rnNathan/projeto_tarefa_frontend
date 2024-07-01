import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../shared/model/usuario';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {

  public jogadorAutenticado: Usuario;
  constructor() { }

  ngOnInit(): void {

    let usuarioNoStorage = localStorage.getItem('usuarioAutenticado');

    if(usuarioNoStorage){
      this.jogadorAutenticado = JSON.parse(usuarioNoStorage);
    }
  }

}